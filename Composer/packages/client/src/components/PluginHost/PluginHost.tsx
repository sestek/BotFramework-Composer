/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { iframeStyle } from './styles';

interface PluginHostProps {
  pluginName?: string;
  pluginType?: string; // TODO: create an enum for all of these
}

export const PluginHost: React.FC<PluginHostProps> = (props) => {
  const targetRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // load the plugin and pass it the render function
    const { pluginName, pluginType } = props;
    const renderPluginView = async () => {
      if (pluginName) {
        const iframeWindow = targetRef.current?.contentWindow as Window;
        const iframeDocument = targetRef.current?.contentDocument as Document;
        const iframeBody = targetRef.current?.contentDocument?.body as Element;
        const root = document.createElement('div');
        if (!iframeDocument.getElementById('plugin-root')) {
          root.id = 'plugin-root';
          iframeBody.appendChild(root);
        }
        // inject the react / reactdom  bundles
        if (!iframeDocument.getElementById('react-bundle')) {
          const script1 = document.createElement('script');
          script1.src = '/react-bundle.js';
          script1.id = 'react-bundle';
          script1.onload = () => {
            console.log('react loaded in iframe');
          };
          iframeBody.appendChild(script1);
        }
        if (!iframeDocument.getElementById('react-dom-bundle')) {
          const script2 = document.createElement('script');
          script2.src = '/react-dom-bundle.js';
          script2.id = 'react-dom-bundle';
          script2.onload = () => {
            console.log('react-dom loaded in iframe');
          };
          iframeBody.appendChild(script2);
        }
        // load the preload script to setup the API
        if (!iframeDocument.getElementById('preload-bundle')) {
          const script3 = document.createElement('script');
          script3.src = '/plugin-host-preload.js';
          script3.id = 'preload-bundle';
          script3.onload = () => {
            iframeWindow['Composer']['submitPublish'] = (config) => window.Composer?.publish?.submitConfig?.(config);
          };
          iframeBody.appendChild(script3);
        }

        // load the bundle for the specified plugin
        const pluginScriptId = `plugin-${pluginType}-${pluginName}`;
        const bundleScript = document.createElement('script');
        bundleScript.id = pluginScriptId;
        bundleScript.src = `/api/plugins/${pluginName}/view/${pluginType}`;
        //bundleScript.async = true;
        await new Promise((resolve) => {
          bundleScript.onload = () => {
            console.log(`Bundle onload complete for ${pluginScriptId}. Resolving!`);
            resolve();
          };
          iframeBody.appendChild(bundleScript);
        });
      }
    };
    renderPluginView();
  }, [props.pluginName, props.pluginType, targetRef]);

  return <iframe ref={targetRef} css={iframeStyle}></iframe>;
};
