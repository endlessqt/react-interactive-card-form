import "./App.scss";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Card from "./components/Card";
import CardForm from "./components/CardForm";

function App() {
  const methods = useForm();
  const [cardNumIsFocused, setCardNumIsFocused] = useState(false);
  return (
    <div className="app">
      <div className="main-wrapper">
        <FormProvider {...methods}>
          <Card cardNumIsFocused={cardNumIsFocused} />
          <CardForm
            setCardNumIsFocused={setCardNumIsFocused}
            cardNumIsFocused={cardNumIsFocused}
          />
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
