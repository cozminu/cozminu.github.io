import "./App.css";
import ArticleTitle from "./components/ArticleTitle";

function App() {
  const title = "Cozmin Ungureanu";
  return (
    <div className="App">
      <header className="App-header">
        <ArticleTitle title={title}>Full Stack Web Developer</ArticleTitle>
      </header>
    </div>
  );
}

export default App;
