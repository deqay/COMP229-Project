const signin = async (user) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Sign-in failed");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: "Sign-in failed. Please try again." };
  }
};

const signup = async (user) => {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Sign-up failed");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: "Sign-up failed. Please try again." };
  }
};

export { signin, signup };
