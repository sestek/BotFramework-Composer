// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { forwardRef, useContext, useEffect, useState, Fragment, Suspense } from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import formatMessage from 'format-message';

import { Header } from './components/Header';
import { NavItem } from './components/NavItem';
import { BASEPATH } from './constants';
import Routes from './router';
import { StoreContext } from './store';
import { main, sideBar, content, divider, globalNav, leftNavBottom, rightPanel, dividerTop } from './styles';
import { resolveToBasePath } from './utils/fileUtil';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RequireAuth } from './components/RequireAuth';
import onboardingState from './utils/onboardingStorage';
import { isElectron } from './utils/electronUtil';
import { useLinks } from './utils/hooks';
import httpClient from './utils/httpUtil';

initializeIcons(undefined, { disableWarnings: true });

const Onboarding = React.lazy(() => import('./Onboarding'));
const AppUpdater = React.lazy(() =>
  import('./components/AppUpdater').then((module) => ({ default: module.AppUpdater }))
);

// eslint-disable-next-line react/display-name
const Content = forwardRef<HTMLDivElement>((props, ref) => <div css={content} {...props} ref={ref} />);

export const App: React.FC = () => {
  const { actions, state } = useContext(StoreContext);
  const [sideBarExpand, setSideBarExpand] = useState(false);

  const { onboardingSetComplete, publishToTarget, openBotProject } = actions;
  const { botName, locale, announcement } = state;
  const { topLinks, bottomLinks } = useLinks();

  const openMultipleProjects = async (storageId: string) => {
    const obj = (window as any).botsToBeLoaded;
    const skillPromises: any[] = [];
    openBotProject(obj.workspace);
    obj.skills.map((skill) => {
      const matched = skill.manifests.find((manifest) => manifest.name === 'default');

      if (matched) {
        const workspace = matched.workspace.split('/');
        workspace.pop();
        workspace.pop();

        const promise = httpClient.put(`/projects/open`, {
          storageId,
          path: workspace.join('/'),
        });
        skillPromises.push(promise);
      }
    });
    const vaPromise = httpClient.put(`/projects/open`, {
      storageId,
      path: obj.workspace,
    });
    const promises = [...skillPromises, vaPromise];

    const responses = await Promise.all(promises);
    for (const response of responses) {
      const projectId = response.data.id;
      await publishToTarget(projectId, {
        name: 'default',
        type: '@bfc/plugin-localpublish',
      });
    }
  };

  useEffect(() => {
    onboardingSetComplete(onboardingState.getComplete());
    console.log(openMultipleProjects);
    // openMultipleProjects('default');
  }, []);

  const mapNavItemTo = (x) => resolveToBasePath(BASEPATH, x);

  const renderAppUpdater = isElectron();

  return (
    <Fragment>
      <div
        aria-live="assertive"
        role="alert"
        style={{
          display: 'block',
          position: 'absolute',
          top: '-9999px',
          height: '1px',
          width: '1px',
        }}
      >
        {announcement}
      </div>
      <Header botName={botName} locale={locale} />
      <div css={main}>
        <nav css={sideBar(sideBarExpand)}>
          <div>
            <IconButton
              ariaLabel={sideBarExpand ? formatMessage('Collapse Nav') : formatMessage('Expand Nav')}
              css={globalNav}
              data-testid={'LeftNavButton'}
              iconProps={{
                iconName: 'GlobalNavButton',
              }}
              onClick={() => {
                setSideBarExpand(!sideBarExpand);
              }}
            />
            <div css={dividerTop} />{' '}
            <FocusZone allowFocusRoot>
              {topLinks.map((link, index) => {
                return (
                  <NavItem
                    key={'NavLeftBar' + index}
                    disabled={link.disabled}
                    exact={link.exact}
                    iconName={link.iconName}
                    labelName={link.labelName}
                    to={mapNavItemTo(link.to)}
                  />
                );
              })}
            </FocusZone>
          </div>
          <div css={leftNavBottom}>
            <div css={divider(sideBarExpand)} />{' '}
            {bottomLinks.map((link, index) => {
              return (
                <NavItem
                  key={'NavLeftBar' + index}
                  disabled={link.disabled}
                  exact={link.exact}
                  iconName={link.iconName}
                  labelName={link.labelName}
                  to={mapNavItemTo(link.to)}
                />
              );
            })}
          </div>
        </nav>
        <div css={rightPanel}>
          <ErrorBoundary>
            <RequireAuth>
              <Routes component={Content} />
            </RequireAuth>
          </ErrorBoundary>
        </div>
        <Suspense fallback={<div />}>{!state.onboarding.complete && <Onboarding />}</Suspense>
        <Suspense fallback={<div />}>{renderAppUpdater && <AppUpdater />}</Suspense>
      </div>
    </Fragment>
  );
};
