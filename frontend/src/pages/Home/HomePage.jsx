import styles from './HomePage.module.css'

export const Start = () => {
    return (
        <main className={styles.startScreen}>
            <div>
                <h1 id={styles.startCall}>Your pet health records accessible anywhere,
                    anytime!</h1>
                {/* <h2 id="startText">We provide you all the resources you require
                    to properly raise your pets.</h2> */}
            </div>
            {/* <div className="buttons">
                <Button>LOGIN</Button>
                <Button>REGISTER</Button>
            </div> */}
        </main>
    )
}
