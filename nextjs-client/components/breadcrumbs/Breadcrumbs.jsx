"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const Breadcrumbs = ({routesMap, root, rootpath}) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((path) => path && path !== root);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathnames.length === 0 ? (
            <BreadcrumbPage>{routesMap[root]}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={rootpath}>{routesMap[root]}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {pathnames.map((path, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{routesMap[path]}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{routesMap[path]}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
