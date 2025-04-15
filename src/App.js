import Routing from "./Routes/Route";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FileUploadProvider } from "./ApiContext/FileUploadContext";
import { ToggleProvider } from "./ApiContext/ToggleContext";

import "./App.css";

function App() {
  return (
    <FileUploadProvider>
      <ToggleProvider>
        <Routing />
      </ToggleProvider>
    </FileUploadProvider>
  );
}

export default App;
