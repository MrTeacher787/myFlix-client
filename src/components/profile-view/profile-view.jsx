import { useState, useEffect } from "react";

export const ProfileView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthday: "",
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch user data on mount
  useEffect(() => {
    fetch(
      `https://kickflix-7d36cfc627dc.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.Username,
          email: data.Email,
          birthday: data.Birthday,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(
      `https://kickflix-7d36cfc627dc.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Username: formData.username,
          Email: formData.email,
          Birthday: formData.birthday,
        }),
      }
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        setEditing(false);
      })
      .catch((err) => console.error("Failed to update user:", err));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      fetch("/users", {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // Optional: Redirect to logout or home page
            window.location.href = "/";
          } else {
            throw new Error("Account deletion failed");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="profile-view">
      <h2>My Profile</h2>

      {editing ? (
        <div>
          <label>
            Name:
            <input
              name="name"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Birthday:
            <input
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {formData.username}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Birthday:</strong> {formData.birthday}
          </p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}

      <hr />

      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
};
