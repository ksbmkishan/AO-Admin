import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [data, setData] = useState()

  useEffect(() => {
    try {
      const userData = localStorage.getItem("userDetails");
      setData(userData)

      if (!userData) {
        navigate("/login");
      }
    }
    catch (e) {
      console.log(e)
    }
  }, [data]);

  return <Layout />;
}

export default PrivateRoute;