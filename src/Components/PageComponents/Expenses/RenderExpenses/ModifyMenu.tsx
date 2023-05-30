import React, { useRef } from "react";

interface IModifyMenuProps {
  modifyFunc: (ogLabel: string, newLabel: string, amount: number) => void;
  setParentState: (newState: string) => void;
  ogLabel: string;
  ogAmount: number;
}

const ModifyMenu = ({
  modifyFunc,
  setParentState,
  ogLabel,
  ogAmount,
}: IModifyMenuProps) => {
  const newLabelRef = useRef<HTMLInputElement>(null);
  const newAmountRef = useRef<HTMLInputElement>(null);

  const saveChangesHandler = () => {
    let currentNewLabel: string;
    let currentNewAmount: number;
    if (newAmountRef.current === null || newLabelRef.current == null) {
      currentNewLabel = ogLabel;
      currentNewAmount = ogAmount;
    } else {
      currentNewLabel = newLabelRef.current.value;
      currentNewAmount = parseInt(newAmountRef.current.value);
    }

    console.log(ogLabel, currentNewLabel, currentNewAmount);
    modifyFunc(ogLabel, currentNewLabel, currentNewAmount);
  };

  const cancelChangesHandler = () => {
    setParentState("default");
  };

  return (
    <React.Fragment>
      <input type="text" ref={newLabelRef} placeholder={ogLabel} />
      <input
        type="number"
        ref={newAmountRef}
        placeholder={ogAmount + ""}
        min={1}
        max={999999}
      />
      <button onClick={cancelChangesHandler}>Cancel</button>
      <button onClick={saveChangesHandler}>Save</button>
    </React.Fragment>
  );
};

export default ModifyMenu;
