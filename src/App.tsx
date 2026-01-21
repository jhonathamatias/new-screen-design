import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BDRPage from "./pages/BDRPage";
import CCBGestaoArquivos from "./pages/CCBGestaoArquivos";
import CCBGestaoArquivosAntd from "./pages/CCBGestaoArquivosAntd";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/troca-titularidade" element={<Index />} />
      <Route path="/bdr" element={<BDRPage />} />
      <Route path="/ccb-gestao-arquivos" element={<CCBGestaoArquivos />} />
      <Route path="/ccb-gestao-arquivos-antd" element={<CCBGestaoArquivosAntd />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
