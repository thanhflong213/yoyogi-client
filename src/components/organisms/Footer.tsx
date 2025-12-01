import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Yoyogi</h3>
                <p className="text-xs text-gray-400">{t('footer.schoolName')}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={() => navigate('/')} className="hover:text-white transition-colors">
                  {t('footer.home')}
                </a>
              </li>
              <li>
                <a href="#" onClick={() => navigate('/exams')} className="hover:text-white transition-colors">
                  {t('footer.examList')}
                </a>
              </li>
              <li>
                <a href="#" onClick={() => navigate('/history')} className="hover:text-white transition-colors">
                  {t('footer.history')}
                </a>
              </li>
              <li>
                <a href="#" onClick={() => navigate('/statistics')} className="hover:text-white transition-colors">
                  {t('footer.statistics')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.pricing')}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">{t('footer.supportTitle')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.userGuide')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{t('footer.phoneLabel')}</p>
                  <p className="text-gray-400">{t('footer.phoneNumber')}</p>
                  <p className="text-xs text-gray-500">{t('footer.hours')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{t('footer.emailLabel')}</p>
                  <p className="text-gray-400">{t('footer.email')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">{t('footer.addressLabel')}</p>
                  <p className="text-gray-400">{t('footer.address')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.sitemap')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.accessibility')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.about')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

