import { useState } from "react";
import "./App.css";
export default function App() {
  const [Password, setPassword] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [length, setLength] = useState(26);

  const numbers = "0123456789";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";
  let characterList = "";

  function GeneratePassword() {
    if (includeUppercase) {
      characterList += upperCaseLetters;
    }
    if (includeLowercase) {
      characterList += lowerCaseLetters;
    }
    if (includeNumbers) {
      characterList += numbers;
    }
    if (includeSymbols) {
      characterList += specialCharacters;
    }
    if (
      !includeLowercase &&
      !includeUppercase &&
      !includeSymbols &&
      !includeNumbers
    ) {
      alert("Check atleast one of the options");
      return;
    }
    console.log(characterList);
    console.log(generateRandomString(characterList));
    setPassword(generateRandomString(characterList));
  }

  const generateRandomString = (characterList) => {
    let result = "";

    const charactersLength = characterList.length;

    for (let i = 0; i < charactersLength; i++) {
      result += characterList.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return result.slice(0, length);
  };
  function handleLength(e) {
    setLength(Number(e.target.value) > 26 ? length : Number(e.target.value));
  }

  return (
    <div className="app">
      <h2>Password Generator</h2>
      <Output Password={Password} />
      <InputLength curlength={length} onChangeLen={handleLength} />
      <div className="checkbox-label">
        <label>Add Uppercase Letters</label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
        />
        <br />
        <label>Add Lowercase Letters</label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)}
        />
        <br />
        <label>Include Numbers</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        />
        <br />
        <label>Include Symbols</label>
        <input
          type="checkbox"
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        />
        <br />
      </div>
      <Button onGen={GeneratePassword}>Generate Password</Button>
    </div>
  );
}
function Output({ Password }) {
  function handleClipboard() {
    navigator.clipboard.writeText(Password);
    alert("Password has been copied to the clipboard");
  }
  return (
    <div className="clipboard" onClick={handleClipboard}>
      <input className="password-output" type="text" value={Password} />
    </div>
  );
}

function InputLength({ curlength, onChangeLen }) {
  return (
    <div className="password-length">
      <label>Password length</label>
      <input
        type="number"
        min={4}
        max={26}
        value={curlength}
        onChange={(e) => onChangeLen(e)}
      ></input>
    </div>
  );
}

function Button({ children, onGen }) {
  return (
    <button className="generate-button" onClick={onGen}>
      {children}
    </button>
  );
}
