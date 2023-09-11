import React, { useState } from 'react';



export function TabulatureEditor() {
  const [originalTab, setOriginalTab] = useState([
    `
e|-------5-7-----7-|-8-----8-2-----2-|-0---------0-----|-----------------|
B|-----5-----5-----|---5-------3-----|---1---1-----1---|-0-1-1-----------|
G|---5---------5---|-----5-------2---|-----2---------2-|-0-2-2-----------|
D|-7-------6-------|-5-------4-------|-3---------------|-----------------|
A|-----------------|-----------------|-----------------|-2-0-0---0--/8-7-|
E|-----------------|-----------------|-----------------|-----------------|
    `,
  ]);

  const [editableTab, setEditableTab] = useState([originalTab[0]]);

  const addRow = (template, replace = false) => {
    const templateText = template || `
e|-------5-7-----7-|-8-----8-2-----2-|-0---------0-----|-----------------|
B|-----5-----5-----|---5-------3-----|---1---1-----1---|-0-1-1-----------|
G|---5---------5---|-----5-------2---|-----2---------2-|-0-2-2-----------|
D|-7-------6-------|-5-------4-------|-3---------------|-----------------|
A|-----------------|-----------------|-----------------|-2-0-0---0--/8-7-|
E|-----------------|-----------------|-----------------|-----------------|
  `;

    const newRow = templateText
      .split('')
      .map((e) => {
        if (e === '-' || e.match(/[0-9+]/)) return e;
        return ' ';
      })
      .join('');

    if (replace) {
      setOriginalTab([newRow]);
      setEditableTab([newRow]);
    } else {
      setOriginalTab([...originalTab, newRow]);
      setEditableTab([...editableTab, newRow]);
    }
  };

  const clear = () => {
    addRow(template, true);
  };

  const download = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(originalTab.join('')));
    element.setAttribute('download', 'tab.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    const updatedTab = [...editableTab];
    const cellValue = updatedTab[rowIndex][cellIndex];
    updatedTab[rowIndex] =
      updatedTab[rowIndex].substring(0, cellIndex) +
      (cellValue === '-' ? ' ' : '-') +
      updatedTab[rowIndex].substring(cellIndex + 1);
    setEditableTab(updatedTab);
  };

  const template = `
e|-----------------------------------------------------------------------|
B|-----------------------------------------------------------------------|
G|-----------------------------------------------------------------------|
D|-----------------------------------------------------------------------|
A|-----------------------------------------------------------------------|
E|-----------------------------------------------------------------------|
  `;

  return (
    <div>
      <div className="tab">
        {editableTab.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.split('').map((cell, cellIndex) => (
              <span
                key={cellIndex}
                className={`cell ${cell === '-' ? 'is-editable' : ''}`}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button className="clear" onClick={clear}>
        Clear
      </button>
      <button className="add-row" onClick={() => addRow(template)}>
        Add Row
      </button>
      <button className="download" onClick={download}>
        Download
      </button>
    </div>
  );
}

export default TabulatureEditor;
