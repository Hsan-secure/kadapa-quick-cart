import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import CheckoutAddress from "./pages/Checkout/Address";
import CheckoutPayment from "./pages/Checkout/Payment";
import OrderTracking from "./pages/Tracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useScrollToTop();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/address" element={<CheckoutAddress />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/order/:orderId" element={<OrderTracking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
