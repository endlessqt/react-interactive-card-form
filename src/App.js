import "./App.scss";
import { useForm, FormProvider } from "react-hook-form";
import Card from "./components/Card";
import CardForm from "./components/CardForm";

function App() {
  const methods = useForm();
  return (
    <div className="app">
      <div className="main-wrapper">
        <FormProvider {...methods}>
          <Card />
          <CardForm />
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
