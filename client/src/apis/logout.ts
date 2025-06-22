import axios from "axios";

export async function logout() {
  axios
    .get("http://localhost:3000/api/logout")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
