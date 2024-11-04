import axios from "axios";

class _ApiRequest {
  post_header = "multipart/form-data";
  get_header = "application/json";
  postRequest = async ({ url = null, data = null, header = "form" }) => {
    try {
      const response = await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
        },
        data: data,
      });
      return response?.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  getRequest = async ({ url = null }) => {
    try {
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type": this.get_header,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
}

export const ApiRequest = new _ApiRequest();
