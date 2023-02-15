import Cookie from "js-cookie";
import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1"
      : "https://backend.depth-focusing.xyz/api/v1/",
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance.post(
    `users/log-in`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

export const githubLogIn = (code: string) =>
  instance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUploadImageVarialbes {
  file: FileList;
  uploadURL: string;
}

export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  userPk: string;
}

export const createPhoto = ({
  description,
  file,
  userPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `users/${userPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IGetSegmentationProps {
  file: string;
}

export const getSegmentation = ({ file }: IGetSegmentationProps) =>
  instance
    .post(
      `medias/photos/get-segmentation`,
      { file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IGetBlurImageProps {
  check_label: number;
  seg_file: string;
  strength: number;
  blur_size: number;
  depth_split: number;
}

export const getBlurImage = ({
  check_label,
  seg_file,
  strength,
  blur_size,
  depth_split,
}: IGetBlurImageProps) =>
  instance
    .post(
      `medias/photos/get-blurimage`,
      { check_label, seg_file, strength, blur_size, depth_split },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const retryBlurImage = ({
  check_label,
  seg_file,
  strength,
  blur_size,
  depth_split,
}: IGetBlurImageProps) =>
  instance
    .post(
      `medias/photos/get-blurimageagain`,
      { check_label, seg_file, strength, blur_size, depth_split },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
