import React from "react";

interface LayoutProps {
  title: string,
  children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
  return <div className="Layout">
    <h1>{title}</h1>
    {children}
    </div>;
};