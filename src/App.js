import './App.scss';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Card from './components/Card';
import CardForm from './components/CardForm';

function App() {
  const methods = useForm();
  const [cardNumIsFocused, setCardNumFocused] = useState(false);
  const [cardHolderIsFocused, setCardHolderFocused] = useState(false);
  const [expireDateIsFocused, setExpireDateFocused] = useState(false);
  const [cvvIsFocused, setCvvFocused] = useState(false);
  return (
    <div className="app">
      <div className="main-wrapper">
        <FormProvider {...methods}>
          <Card
            cvvIsFocused={cvvIsFocused}
            expireDateIsFocused={expireDateIsFocused}
            cardNumIsFocused={cardNumIsFocused}
            cardHolderIsFocused={cardHolderIsFocused}
          />
          <CardForm
            cvvIsFocused={cvvIsFocused}
            setCvvFocused={setCvvFocused}
            expireDateIsFocused={expireDateIsFocused}
            setExpireDateFocused={setExpireDateFocused}
            cardNumIsFocused={cardNumIsFocused}
            setCardNumFocused={setCardNumFocused}
            cardHolderIsFocused={cardHolderIsFocused}
            setCardHolderFocused={setCardHolderFocused}
          />
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
