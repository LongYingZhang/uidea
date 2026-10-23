import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { StitchHost } from "./components/StitchHost";
import { RequireAuth } from "./components/auth/RequireAuth";
import { AuthLayout } from "./components/layout/AuthLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { SimpleSiteLayout } from "./components/layout/SimpleSiteLayout";
import { EnterpriseRegisterPage } from "./pages/auth/EnterpriseRegisterPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ConsoleMessagesPage } from "./pages/console/ConsoleMessagesPage";
import { ConsoleNotificationsPage } from "./pages/console/ConsoleNotificationsPage";
import { ProfilePage } from "./pages/console/ProfilePage";
import { CoursesPage } from "./pages/CoursesPage";
import { DesignersPage } from "./pages/DesignersPage";
import { PlazaPage } from "./pages/PlazaPage";
import { TasksPage } from "./pages/TasksPage";
import { CompetitionListPage } from "./pages/public/CompetitionListPage";
import { CompetitionRankPage } from "./pages/public/CompetitionRankPage";
import { CompetitionTopicPage } from "./pages/public/CompetitionTopicPage";
import { CourseDetailPage } from "./pages/public/CourseDetailPage";
import { CourseLearnPage } from "./pages/public/CourseLearnPage";
import { DesignerHomePage } from "./pages/public/DesignerHomePage";
import { LegalPage } from "./pages/public/LegalPage";
import { ProductPage } from "./pages/public/ProductPage";
import { TaskDetailPage } from "./pages/public/TaskDetailPage";
import { VisionPage } from "./pages/public/VisionPage";
import { WorkDetailPage } from "./pages/public/WorkDetailPage";

export default function App() {
  return (
    <HashRouter>
      <StitchHost>
        <Routes>
          {/* Main marketing pages — one shared SiteHeader */}
          <Route element={<RequireAuth><SimpleSiteLayout /></RequireAuth>}>
            <Route index element={<PlazaPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="designers" element={<DesignersPage />} />
            <Route path="courses" element={<CoursesPage />} />
            {/* Sidebar entries: 通知 / 沟通 / 个人资料 reuse the console pages */}
            <Route path="notifications" element={<ConsoleNotificationsPage />} />
            <Route path="messages" element={<ConsoleMessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Detail / secondary public pages — same header chrome */}
          <Route element={<RequireAuth><PublicLayout /></RequireAuth>}>
            <Route path="works/:id" element={<WorkDetailPage />} />
            <Route path="tasks/:id" element={<TaskDetailPage />} />
            <Route path="designers/:id" element={<DesignerHomePage />} />
            <Route path="courses/:id" element={<CourseDetailPage />} />
            <Route path="courses/learning/:id" element={<CourseLearnPage />} />
            <Route path="competitions" element={<CompetitionListPage />} />
            <Route path="competitions/one" element={<CompetitionTopicPage />} />
            <Route path="competitions/1" element={<CompetitionRankPage />} />
            <Route path="vision" element={<VisionPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="legal/:slug" element={<LegalPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="register/enterprise"
              element={<EnterpriseRegisterPage />}
            />
          </Route>

          <Route path="console/*" element={<Navigate to="/" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StitchHost>
    </HashRouter>
  );
}
