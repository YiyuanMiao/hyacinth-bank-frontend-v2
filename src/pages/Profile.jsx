import { useState, useEffect, useRef } from "react";
import { apiService } from "../services/api";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiService.getMyProfile();

      if (response.data.statusCode === 200) {
        setUserData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "An error occurred while fetching profile data",
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePictureFile = async (file) => {
    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiService.uploadProfilePicture(file);

      if (response.data.statusCode === 200) {
        setSuccess("Profile picture updated successfully!");
        await fetchUserProfile();

        setTimeout(() => {
          setSuccess("");
        }, 4000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "An error occurred while uploading profile picture",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      uploadProfilePictureFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const safeLower = (value, fallback = "unknown") => {
    const v = value ?? fallback;
    return String(v).toLowerCase();
  };

  const safeNumber = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const safeDateString = (value) => {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "Not available" : d.toLocaleDateString();
  };

  console.log("profilePictureUrl =", userData?.profilePictureUrl);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading your profile information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="error-message">No profile data available</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <a href="/update-profile" className="btn btn-primary">
          Change Password
        </a>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-content">
        <div className="profile-picture-section">
          <h2>Profile Picture</h2>
          <div className="profile-picture-upload">
            <div className="profile-picture">
              {userData?.profilePictureUrl ? (
                <img
                  src={
                    userData.profilePictureUrl.startsWith("http")
                      ? userData.profilePictureUrl
                      : `https://bank-bucket-cici.s3.us-east-2.amazonaws.com/${userData.profilePictureUrl}`
                  }
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/150x150?text=Profile";
                  }}
                />
              ) : (
                <div className="placeholder">No Image Data</div>
              )}
            </div>
            <div className="upload-controls">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: "none" }}
              />

              <button
                onClick={triggerFileInput}
                className="btn btn-primary"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Change Picture"}
              </button>
            </div>

            <p className="upload-note">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>
        </div>

        <div className="profile-info">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>First Name</label>
              <p>{userData.firstName || "Not available"}</p>
            </div>
            <div className="info-item">
              <label>Last Name</label>
              <p>{userData.lastName || "Not available"}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{userData.email || "Not available"}</p>
            </div>
            <div className="info-item">
              <label>Phone Number</label>
              <p>{userData.phoneNumber || "Not available"}</p>
            </div>
            <div className="info-item">
              <label>Status</label>
              <p
                className={
                  userData.active ? "status active" : "status inactive"
                }
              >
                {userData.active ? "ACTIVE" : "INACTIVE"}
              </p>
            </div>
          </div>
        </div>
        {/* ---------------- Accounts ---------------- */}
        <div className="accounts-section">
          <h2>My Accounts</h2>

          {Array.isArray(userData.accounts) && userData.accounts.length > 0 ? (
            userData.accounts.map((account) => {
              const accountStatusText = account?.accountStatus ?? "UNKNOWN";
              const accountStatusClass = safeLower(accountStatusText);

              const balance = safeNumber(account?.balance, 0);
              const currency = account?.currency || "";

              return (
                <div
                  key={account?.id ?? account?.accountNumber}
                  className="account-card"
                >
                  <div className="account-header">
                    <h3>{account?.accountType || "Account"} Account</h3>

                    <span className={`status ${accountStatusClass}`}>
                      {accountStatusText}
                    </span>
                  </div>

                  <div className="account-details">
                    <div className="account-number">
                      <label>Account Number</label>
                      <p>{account?.accountNumber || "Not available"}</p>
                    </div>

                    <div className="account-balance">
                      <label>Balance</label>
                      <p>
                        {currency} {balance.toFixed(2)}
                      </p>
                    </div>

                    <div className="account-created">
                      <label>Created On</label>
                      <p>{safeDateString(account?.createdAt)}</p>
                    </div>
                  </div>

                  {/* ---------------- Transactions ---------------- */}
                  <div className="transactions-section">
                    <h4>Recent Transactions</h4>

                    {Array.isArray(account?.transactions) &&
                      account.transactions.length > 0 ? (
                      <div className="transactions-list">
                        {account.transactions.slice(0, 5).map((transaction) => {
                          const txTypeText =
                            transaction?.transactionType ?? "UNKNOWN";
                          const txTypeClass = safeLower(txTypeText);

                          const amount = safeNumber(transaction?.amount, 0);
                          const sign =
                            txTypeText === "WITHDRAWAL" ||
                              txTypeText === "TRANSFER"
                              ? "-"
                              : "+";

                          return (
                            <div
                              key={
                                transaction?.id ??
                                `${txTypeText}-${transaction?.transactionDate}`
                              }
                              className="transaction-item"
                            >
                              <div className="transaction-info">
                                <span className="transaction-type">
                                  {txTypeText}
                                </span>
                                <span className="transaction-date">
                                  {safeDateString(transaction?.transactionDate)}
                                </span>
                              </div>

                              <div className="transaction-details">
                                <p className="transaction-description">
                                  {transaction?.description || "Not available"}
                                </p>

                                <p
                                  className={`transaction-amount ${txTypeClass}`}
                                >
                                  {sign}
                                  {currency} {Math.abs(amount).toFixed(2)}
                                </p>
                              </div>

                              {transaction?.sourceAccount &&
                                transaction?.destinationAccount && (
                                  <div className="transaction-accounts">
                                    <small>
                                      From: {transaction.sourceAccount} → To:{" "}
                                      {transaction.destinationAccount}
                                    </small>
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p>No transactions found</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No accounts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
