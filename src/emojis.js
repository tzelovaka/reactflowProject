const emojis = [];
  for (let i = 0x1F600; i <= 0x1F64F; i++) {
    emojis.push(String.fromCodePoint(i));
  }
  for (let i = 0x1F680; i <= 0x1F6C5; i++) {
    emojis.push(String.fromCodePoint(i));
  }
  for (let i = 0x2600; i <= 0x26FF; i++) {
    emojis.push(String.fromCodePoint(i));
  }
  for (let i = 0x2700; i <= 0x27BF; i++) {
    emojis.push(String.fromCodePoint(i));
  }
  for (let i = 0x1F300; i <= 0x1F5FF; i++) {
    emojis.push(String.fromCodePoint(i));
  }
  for (let i = 0x1F900; i <= 0x1F9FF; i++) {
    emojis.push(String.fromCodePoint(i));
  }
  
  export default emojis;