function Icon({ className, iconString, onClickIcon }) {
  return (
    <div
      className={`${className} icon iconfont`}
      dangerouslySetInnerHTML={{ __html: iconString }}
      onClick={onClickIcon}
    ></div>
  );
}

export default Icon;
