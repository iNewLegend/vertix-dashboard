import ZenRedux from "@zenflux/redux";

export default function Profile() {
    const profile = ZenRedux.hooks.useControllerProperty( "Auth/Controller", "profile" );

    return (
        <>
            <div className="profile d-flex justify-content-center mt-5">
                <div className="card w-50">
                    <img src={ profile.avatar } className="card-img-top w-25 rounded-circle mx-auto d-block mt-5"
                         alt="avatar"/>
                    <div className="card-body">
                        <div className="card-text">
                            <p><strong>Discord ID:</strong> <code>{ profile.discordId }</code></p>
                            <p><strong>Username:</strong> { profile.username }</p>
                            <p><strong>Email:</strong> { profile.email }</p>
                            <p><strong>Using dashboard since:</strong> { new Date(profile.createdAt).toLocaleString() }</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
