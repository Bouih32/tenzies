export default function Dice(props) {
  let styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="soloNum" onClick={props.holdDice} style={styles}>
      <h1>{props.value}</h1>
    </div>
  );
}
