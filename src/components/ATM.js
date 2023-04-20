
const ATM = ({ onChange, atmMode, validTransaction, value }) => {
  if(atmMode !== "")  {  return (
        <div>
          <input className="mb-3" id="number-input" type="number" value={value} onChange={onChange}></input> <br/>
          <input className="button mx-1" style={{background:'white',borderRadius:'20px',border:'none'}} type="submit" value="Submit" disabled={!validTransaction} id="submit-input"></input>
        </div>
      );
} else return <></>;
};

export default ATM;