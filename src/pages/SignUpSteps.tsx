import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClientConfig";
import "./css/SignUpSteps.css";

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    full_name?: string;
  };
}

interface UserProfile {
  username: string;
  userType: "consumer" | "seller" | "";
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  businessName: string;
  businessType: string;
  bio: string;
}

interface ValidationErrors {
  username?: string;
  userType?: string;
  fullName?: string;
  phoneNumber?: string;
  businessName?: string;
  businessType?: string;
}

const SignUpSteps: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    userType: "",
    fullName: "",
    phoneNumber: "",
    countryCode: "+234", // Default to Nigeria
    businessName: "",
    businessType: "",
    bio: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Get the current session to verify the user
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          navigate("/signup");
          return;
        }

        if (!session || !session.user) {
          console.log("No active session found");
          navigate("/signup");
          return;
        }

        // Verify that the URL parameter matches the authenticated user
        if (session.user.id !== id) {
          console.log("User ID mismatch");
          navigate("/signup");
          return;
        }

        setUser(session.user);

        // Pre-fill name if available from Google
        if (session.user.user_metadata?.full_name) {
          setProfile((prev) => ({
            ...prev,
            fullName: session.user.user_metadata.full_name || "",
          }));
        }
      } catch (error) {
        console.error("Error in SignUpSteps:", error);
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      verifyUser();
    } else {
      navigate("/signup");
    }
  }, [id, navigate]);
  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!profile.username.trim())
          newErrors.username = "Username is required";
        if (!profile.userType) newErrors.userType = "Please select your role";
        break;
      case 2:
        if (!profile.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!profile.phoneNumber.trim())
          newErrors.phoneNumber = "Phone number is required";
        break;
      case 3:
        if (profile.userType === "seller") {
          if (!profile.businessName.trim())
            newErrors.businessName = "Business name is required";
          if (!profile.businessType.trim())
            newErrors.businessType = "Business type is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setSubmitting(true);
    try {
      // Create user profile in your database
      // You'll need to create a profiles table in Supabase
      const { error } = await supabase.from("profiles").insert([
        {
          id: user?.id,
          username: profile.username,
          user_type: profile.userType,
          full_name: profile.fullName,
          phone_number: `${profile.countryCode}${profile.phoneNumber}`,
          business_name: profile.businessName,
          business_type: profile.businessType,
          bio: profile.bio,
          email: user?.email,
          avatar_url: user?.user_metadata?.avatar_url,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error creating profile:", error);
        alert("Error creating profile. Please try again.");
        return;
      }

      // Redirect to dashboard after successful profile creation
      navigate(`/dashboard/${user?.id}`);
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="signup-steps-loading">
        <div className="loading-spinner"></div>
        <p>Verifying your account...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalSteps = profile.userType === "seller" ? 4 : 3;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="signup-steps-container">
      <div className="signup-steps-card">
        <div className="signup-steps-header">
          <h1>Complete Your Profile</h1>
          <p>Just a few more steps to get you started!</p>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        <div className="signup-steps-content">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="step-content">
              <h2>Basic Information</h2>
              <div className="input-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Choose a unique username"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className={errors.username ? "error" : ""}
                />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>

              <div className="input-group">
                <label>I am a *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="userType"
                      value="consumer"
                      checked={profile.userType === "consumer"}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          userType: e.target.value as "consumer" | "seller",
                        }))
                      }
                    />
                    <span className="radio-text">
                      <strong>Consumer</strong>
                      <small>I want to buy products</small>
                    </span>
                  </label>

                  <label className="radio-option">
                    <input
                      type="radio"
                      name="userType"
                      value="seller"
                      checked={profile.userType === "seller"}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          userType: e.target.value as "consumer" | "seller",
                        }))
                      }
                    />
                    <span className="radio-text">
                      <strong>Seller</strong>
                      <small>I want to sell products</small>
                    </span>
                  </label>
                </div>
                {errors.userType && (
                  <span className="error-message">{errors.userType}</span>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {currentStep === 2 && (
            <div className="step-content">
              <h2>Personal Details</h2>
              <div className="input-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Your full name"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>{" "}
              <div className="input-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <div
                  className={`phone-input-container ${
                    errors.phoneNumber ? "error" : ""
                  }`}
                >
                  <select
                    className="country-select"
                    value={profile.countryCode}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        countryCode: e.target.value,
                      }))
                    }
                  >
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+233">🇬🇭 +233</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+256">🇺🇬 +256</option>
                    <option value="+255">🇹🇿 +255</option>
                    <option value="+250">🇷🇼 +250</option>
                    <option value="+212">🇲🇦 +212</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+420">🇨🇿 +420</option>
                    <option value="+421">🇸🇰 +421</option>
                    <option value="+36">🇭🇺 +36</option>
                    <option value="+40">🇷🇴 +40</option>
                    <option value="+359">🇧🇬 +359</option>
                    <option value="+385">🇭🇷 +385</option>
                    <option value="+386">🇸🇮 +386</option>
                    <option value="+372">🇪🇪 +372</option>
                    <option value="+371">🇱🇻 +371</option>
                    <option value="+370">🇱🇹 +370</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="800 000 0000"
                    value={profile.phoneNumber}
                    onChange={(e) => {
                      // Remove any non-numeric characters except spaces and hyphens for formatting
                      const cleaned = e.target.value.replace(/[^\d\s-]/g, "");
                      setProfile((prev) => ({
                        ...prev,
                        phoneNumber: cleaned,
                      }));
                    }}
                  />
                </div>
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Business Details (for sellers) */}
          {currentStep === 3 && profile.userType === "seller" && (
            <div className="step-content">
              <h2>Business Information</h2>
              <div className="input-group">
                <label htmlFor="businessName">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  placeholder="Your business or store name"
                  value={profile.businessName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      businessName: e.target.value,
                    }))
                  }
                  className={errors.businessName ? "error" : ""}
                />
                {errors.businessName && (
                  <span className="error-message">{errors.businessName}</span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="businessType">Business Type *</label>
                <select
                  id="businessType"
                  value={profile.businessType}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      businessType: e.target.value,
                    }))
                  }
                  className={errors.businessType ? "error" : ""}
                >
                  <option value="">Select business type</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion & Clothing</option>
                  <option value="food">Food & Beverages</option>
                  <option value="beauty">Beauty & Personal Care</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports & Fitness</option>
                  <option value="books">Books & Media</option>
                  <option value="automotive">Automotive</option>
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <span className="error-message">{errors.businessType}</span>
                )}
              </div>
            </div>
          )}

          {/* Step 3/4: Bio & Final Details */}
          {((currentStep === 3 && profile.userType === "consumer") ||
            (currentStep === 4 && profile.userType === "seller")) && (
            <div className="step-content">
              <h2>Tell us about yourself</h2>
              <div className="input-group">
                <label htmlFor="bio">Bio (Optional)</label>
                <textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself or your business..."
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={4}
                />
              </div>

              <div className="profile-summary">
                <h3>Profile Summary</h3>
                <div className="summary-item">
                  <strong>Username:</strong> {profile.username}
                </div>
                <div className="summary-item">
                  <strong>Role:</strong>{" "}
                  {profile.userType === "seller" ? "Seller" : "Consumer"}
                </div>
                <div className="summary-item">
                  <strong>Name:</strong> {profile.fullName}
                </div>
                <div className="summary-item">
                  <strong>Email:</strong> {user.email}
                </div>
                {profile.userType === "seller" && (
                  <div className="summary-item">
                    <strong>Business:</strong> {profile.businessName}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="signup-steps-actions">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handlePrevious}
              disabled={submitting}
            >
              Previous
            </button>
          )}

          {!isLastStep ? (
            <button type="button" className="btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpSteps;
