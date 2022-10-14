const MainContentWrapper = ({ children, sidebarwidth }) => {
  return (
    <div
      style={{
        width: `calc(100% - ${sidebarwidth}px)`,
        padding: "20px",
        // backgroundColor: "rgb(29, 29, 29)", //* UNCOMMENT THIS AFTER finishing code
        // overscrollBehaviorY: "none",
        overflow: "auto",
        marginLeft: sidebarwidth,
      }}
    >
      {children}
    </div>
  );
};
export default MainContentWrapper;
