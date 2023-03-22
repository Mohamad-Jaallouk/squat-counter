import { useState } from "react";

type FormProps = {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    submittedReps: number
  ) => void;
};

export default function Form({ handleSubmit }: FormProps) {
  const [reps, setReps] = useState(0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReps(Number(e.target.value));
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, reps)}>
        <label htmlFor="reps">Reps:</label>
        <input
          type="text"
          id="reps"
          name="reps"
          value={reps}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
