import Base from "../components/Base";
import userContext from "../context/userContext";

const About=()=>{
    return(
        <userContext.Consumer>
            {(user) => (
                <Base>
                    <h1>This is about page.</h1>
                    <p>We are building blog web app.</p>
                    <h1>Welcome {user.name} </h1>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default About;