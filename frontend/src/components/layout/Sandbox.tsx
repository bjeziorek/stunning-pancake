import { useTranslation } from "react-i18next";


export default function Sandbox() {

  const { t } = useTranslation();

  return (


    <div className="flex h-full w-full gap-4 p-4 bg-gray-50 dark:bg-gray-900">


      {/* Main playground area */}
      <div className="flex-1 rounded-xl bg-white dark:bg-gray-800 shadow p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {t("sandbox.title")}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("sandbox.info")}
        </p>

        {/* miejsce na Twoje zabawy */}
        <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
          {/* wrzucaj tu swoje testy */}
          <p className="text-gray-500 dark:text-gray-400">
           {t("sandbox.placeholder")}
          </p>
        </div>
      </div>

      {/* Optional side panel for notes / debug */}
      <aside className="hidden lg:flex flex-col w-80 rounded-xl bg-white dark:bg-gray-800 shadow p-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Notes / Debug
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Możesz tu trzymać notatki, logi, debug output, checklisty itd.
        </p>
      </aside>
    </div>
  );
}
