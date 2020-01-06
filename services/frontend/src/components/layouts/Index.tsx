import React from "react";
import CreatePost from "../posts/CreatePost";
import Posts from "../posts/Posts";

export default function Index() {
  return (
    <React.Fragment>
      <CreatePost />
      <Posts />
    </React.Fragment>
  );
}
