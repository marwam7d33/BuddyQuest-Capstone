import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const MatchmakingPage = () => {
  const [partners, setPartners] = useState([]); // Store fetched matchmaking pairs
  const [users, setUsers] = useState([]); // Store users (for dropdown)
  const [habits, setHabits] = useState([]); // Store habits (for dropdown)
  const [matchCriteria, setMatchCriteria] = useState({
    userId: "",
    partnerId: "",
    habitId: "",
  });

  useEffect(() => {
    // Fetch matchmaking pairs, users, and habits
    const fetchData = async () => {
      try {
        // Get all matchmaking pairs
        const matchmakingResponse = await axios.get(
          "http://localhost:8080/matchmaking"
        );
        setPartners(matchmakingResponse.data);

        // Get all users (you might have a separate endpoint for users)
        const usersResponse = await axios.get("http://localhost:8080/users");
        setUsers(usersResponse.data);

        // Get all habits (you might have a separate endpoint for habits)
        const habitsResponse = await axios.get("http://localhost:8080/habits");
        setHabits(habitsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle creating a new matchmaking pair
  const handleCreatePair = async () => {
    if (
      !matchCriteria.userId ||
      !matchCriteria.partnerId ||
      !matchCriteria.habitId
    ) {
      alert("Please select a user, partner, and habit.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/matchmaking", {
        user_id: matchCriteria.userId,
        partner_id: matchCriteria.partnerId,
        habit_id: matchCriteria.habitId,
      });
      setPartners([...partners, response.data]); // Add the new pair to the state
      alert("New matchmaking pair created!");
    } catch (error) {
      console.error("Error creating matchmaking pair:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Existing Matchmaking Pairs */}
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            title="Accountability Partners"
            subheader="These are your current accountability partners"
            sx={{
              backgroundColor: "rgba(0, 128, 0, 0.1)",
              color: "green",
              borderBottom: "2px solid green",
            }}
          />
          <CardContent>
            {partners.map((pair) => (
              <div key={pair.id} className="mb-4">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "green" }}
                >
                  Partner Pair: User {pair.user_id} and User {pair.partner_id}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  Habit ID: {pair.habit_id}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "green",
                    color: "green",
                    marginTop: "10px",
                  }}
                >
                  View Profile
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Form to Create New Matchmaking Pair */}
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            title="Find Accountability Partner"
            subheader="Create a new matchmaking pair"
            sx={{
              backgroundColor: "rgba(0, 128, 0, 0.1)",
              color: "green",
              borderBottom: "2px solid green",
            }}
          />
          <CardContent>
            <div>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "green" }}
              >
                Select User
              </Typography>
              <TextField
                select
                fullWidth
                value={matchCriteria.userId}
                onChange={(e) =>
                  setMatchCriteria({ ...matchCriteria, userId: e.target.value })
                }
                sx={{
                  backgroundColor: "#f4f4f4",
                  borderRadius: 1,
                  marginTop: 2,
                }}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </TextField>
            </div>

            <div className="mt-4">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "green" }}
              >
                Select Partner
              </Typography>
              <TextField
                select
                fullWidth
                value={matchCriteria.partnerId}
                onChange={(e) =>
                  setMatchCriteria({
                    ...matchCriteria,
                    partnerId: e.target.value,
                  })
                }
                sx={{
                  backgroundColor: "#f4f4f4",
                  borderRadius: 1,
                  marginTop: 2,
                }}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </TextField>
            </div>

            <div className="mt-4">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "green" }}
              >
                Select Habit
              </Typography>
              <TextField
                select
                fullWidth
                value={matchCriteria.habitId}
                onChange={(e) =>
                  setMatchCriteria({
                    ...matchCriteria,
                    habitId: e.target.value,
                  })
                }
                sx={{
                  backgroundColor: "#f4f4f4",
                  borderRadius: 1,
                  marginTop: 2,
                }}
              >
                {habits.map((habit) => (
                  <option key={habit.id} value={habit.id}>
                    {habit.name}
                  </option>
                ))}
              </TextField>
            </div>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "white",
                marginTop: "10px",
              }}
              onClick={handleCreatePair}
            >
              Create Match
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchmakingPage;
