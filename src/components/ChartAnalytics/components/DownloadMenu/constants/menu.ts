import i18n from "@dhis2/d2-i18n";

export const chartMenuSections = [
  {
    name: "download",
    menuItems: [
      {
        name: "png",
        label: i18n.t("Download PNG"),
      },
      {
        name: "jpeg",
        label: i18n.t("Download JPEG"),
      },
      {
        name: "svg",
        label: i18n.t("Download SVG"),
      },
      {
        name: "pdf",
        label: i18n.t("Download PDF"),
      },
    ],
  },
  {
    name: "view",
    menuItems: [
      {
        name: "table",
        label: i18n.t("View as table"),
      },
      {
        name: "full-screen",
        label: i18n.t("View full screen"),
      },
    ],
  },
];
