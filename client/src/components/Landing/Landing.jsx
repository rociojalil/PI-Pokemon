import React from 'react';
import { Link } from 'react-router-dom';
import Video from '../Landing/media/video.mp4'
import styles from '../Landing/Landing.module.css'

const Landing = () => {
    return (
        <div className={styles.container}>
            <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1"
                    }}
                >
                    <source src={Video} type="video/mp4"></source>
                </video>
                    <div className={styles.titulo}>
                    <h1>Welcome to <br></br>Pokemon World</h1>
                    <br></br>
                        <Link to = "/home"/>
                        <div className={styles.main}>
                            <button className={styles.btn}>
                                     Start
                            </button>
                        </div>

                </div>

            </div>
    )
}

export default Landing;