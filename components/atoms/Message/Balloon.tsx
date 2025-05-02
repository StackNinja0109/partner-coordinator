'use client'

export enum BalloonType {
  Sent,
  Received,
}

export enum BalloonColor {
  White,
  Green,
  Blue,
  Gray
}

interface BalloonProps {
  className?: string,
  textContent: string,
  balloonType: BalloonType,
  balloonColor: BalloonColor,
}

const Balloon: React.FC<BalloonProps> = ({ className = '', textContent, balloonType, balloonColor }) => {
  let styleClass = "";
  let colorVal = "";

  switch (balloonColor) {
    case BalloonColor.White:
      styleClass = "bg-gray-white text-gray-black";
      colorVal = "#FDFDFD";
      break;
    case BalloonColor.Green:
      styleClass = "bg-core-green text-gray-black";
      colorVal = "#BDED9A";
      break;
    case BalloonColor.Blue:
      styleClass = "bg-core-blue text-gray-white";
      colorVal = "#307DC1";
      break;
    case BalloonColor.Gray:
      styleClass = "bg-gray-gray_dark text-gray-white";
      colorVal = "#AFAFAF";
      break;
    default:
      styleClass = "bg-gray-white text-gray-black";
      colorVal = "#FDFDFD";
      break;
  }

  return (
    <div className={`relative ${balloonType === BalloonType.Sent && "pl-2"} ${balloonType === BalloonType.Received && "pr-2"}`}>
      {balloonType === BalloonType.Sent && (
        <span className="absolute top-0 left-0">
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0C1.99997 2.00049 8.66668 3.33333 11 3C8.50001 5.5 8.00001 9 8.00001 9C2.5 8 0 0 0 0Z" fill={colorVal}/>
          </svg>
        </span>
      )}
      {balloonType === BalloonType.Received && (
        <span className="absolute top-0 right-0">
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0C9.00003 2.00049 2.33333 3.33333 0 3C2.5 5.5 3 9 3 9C8.5 8 11 0 11 0Z" fill={colorVal}/>
          </svg>
        </span>
      )}
      <div className={`${className} ${styleClass} inline-block p-[10px] rounded-[10px]`}>
        <pre className="break-all align-baseline text-body_sp whitespace-break-spaces">{textContent}</pre>
      </div>
    </div>
  );
};

export default Balloon;