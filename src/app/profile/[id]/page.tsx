
export default async function UserProfile({ params }: any) {
    const { id } = await params;

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Welcome to your profile page!
            <span className="p-2 ml-2 rounded bg-amber-700">
                {id}
            </span></p>
        </div>
    )
}
