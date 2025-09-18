type ProfilePicProps = {
  src: string;
  alt: string;
  className?: string;
};

function ProfilePic(props: ProfilePicProps) {
  return (
    <div className="ProfilePic">
      <img
        src={props.src}
        alt={props.alt}
        className={
          props.className ||
          "w-28 h-28 md:w-32 md:h-32 rounded-full object-cover"
        }
      />
    </div>
  );
}

export default ProfilePic;
