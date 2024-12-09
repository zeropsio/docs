const UnorderedCodeList = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return null; // or return a default/fallback UI
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}><code>{item}</code></li>
      ))}
    </ul>
  );
};

export default UnorderedCodeList; 