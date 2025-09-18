type ProfileTitleProps = {
  name: string;
  title: string;
  location?: string;
};

function ProfileTitle(props: ProfileTitleProps) {
  return (
    <div className="ProfileTitle">
      <h1>{props.name}</h1>
      <h2>{props.title}</h2>
      {props.location ? <h3>{props.location}</h3> : null}
    </div>
  );
}

export default ProfileTitle;
