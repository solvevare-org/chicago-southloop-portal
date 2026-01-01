import { AppProvider, useApp } from './store/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RequestAccountPage from './pages/RequestAccountPage';

function AppContent() {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hide header on auth pages: signin, forgot-password, request-account */}
      {!(currentPage === 'signin' || currentPage === 'forgot-password' || currentPage === 'request-account') && (
        <Header />
      )}

      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductListPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'my-account' && <MyAccountPage />}
        {currentPage === 'signin' && <SignInPage />}
        {currentPage === 'forgot-password' && <ForgotPasswordPage />}
        {currentPage === 'request-account' && <RequestAccountPage />}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
