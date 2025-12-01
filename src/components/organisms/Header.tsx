import { Logo } from "@/components/atoms/Logo";
import { LanguageSwitcher } from "@/components/atoms/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  User,
  BookOpen,
  History,
  BarChart3,
  Phone,
  Bell,
  Star,
} from "lucide-react";
import { useUiStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { toggleSidebar } = useUiStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-1.5">
        <div className="container flex items-center justify-between px-4 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="hidden sm:inline">
                {t("header.achievement")}
              </span>
              <span className="sm:hidden">{t("header.achievementShort")}</span>
            </div>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{t("header.support24")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline">{t("header.phone")}</span>
            <span className="sm:hidden">{t("header.contactShort")}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 sm:h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-base font-medium hover:text-blue-600 hover:bg-blue-50"
            >
              {t("nav.home")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/exams")}
              className="text-base font-medium hover:text-blue-600 hover:bg-blue-50"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {t("nav.exams")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/history")}
              className="text-base font-medium hover:text-blue-600 hover:bg-blue-50"
            >
              <History className="h-4 w-4 mr-2" />
              {t("nav.history")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/statistics")}
              className="text-base font-medium hover:text-blue-600 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {t("nav.statistics")}
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:flex"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              3
            </Badge>
          </Button>

          {/* Contact/Support Button */}
          <Button
            size="sm"
            className="hidden sm:flex bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
          >
            <Phone className="h-4 w-4 mr-2" />
            {t("nav.contact")}
          </Button>

          <LanguageSwitcher />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="relative"
          >
            <User className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};
