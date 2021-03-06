import React from "react";
import "./SinglePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BestPosts from "./aside/BestPosts";
//Pics
import ViewIcon from "../../assets/view-icon.svg";
import ProfilePic from "../../assets/ProfilePic.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { db } from "../../firebase";
import { collection, getDocs } from "@firebase/firestore";

export default function SinglePost() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    function getPostsfromFirebase(id) {
      getDocs(postsCollectionRef)
        .then((res) => {
          res.docs.forEach((doc) => {
            if (id === doc.id) {
              setPosts(doc.data());
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getPostsfromFirebase(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="single-post-wrap">
      <Profile />
      <div className="main-post">
        <div>
          <LazyLoadImage
            src={posts.image}
            alt="single-post-pic"
            className="single-post-pic"
            effect="opacity"
            delayTime="1000"
          />
        </div>

        <p className="photo-by">Фото: Dilorom Alieva</p>
        <div className="blog-time-stats">
          <span>
            <p>
              18:26 11.01.2021 |
              <span>
                {(/ /g, "\u00a0")} <img src={ViewIcon} alt="view-icon" />{" "}
                {(/ /g, "\u00a0")}
                365
              </span>
            </p>
          </span>
        </div>
        <div>
          <div>
            <h1 className="main-post-title">{posts.title}</h1>
            <p className="p-body">{posts.description}</p>
          </div>
        </div>
      </div>
      <div className="best-posts-wrap">
        <h2>ЛУЧШИЕ БЛОГИ</h2>
        <BestPosts />
        <BestPosts />
        <BestPosts />
        <BestPosts />
      </div>
    </div>
  );
}

//Profile component
function Profile() {
  return (
    <div className="profile-wrap">
      <LazyLoadImage
        src={ProfilePic}
        alt="profile-pic"
        effect="opacity"
        delayTime="1000"
      />

      <h2>Dilorom Alieva</h2>
      <div className="profile-btns">
        <button>Follow</button>
        <button>
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
    </div>
  );
}
