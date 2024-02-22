import React from 'react';
import { Web3Modal } from '../pages/api/Web3Modal'
import { useState } from 'react';

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

export default function RootLayout() {
    const [buttonClicked, setButtonClicked] = useState(false);
    const handleButtonClick = () => {
        setButtonClicked(!buttonClicked);
    };
  return (
    <section>
      <Web3Modal><w3m-button onClick = {handleButtonClick}/></Web3Modal>     
    </section>
     
  );
}