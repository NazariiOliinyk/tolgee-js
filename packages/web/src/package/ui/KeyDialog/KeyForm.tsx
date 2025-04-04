import { IconButton, Button, styled, useTheme, Link } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

import { TranslationFields } from './TranslationFields';
import { LanguageSelect } from './LanguageSelect';
import { LoadingButton } from '../common/LoadingButton';
import { ScreenshotGallery } from './ScreenshotGallery/ScreenshotGallery';
import { ScFieldTitle } from '../common/FieldTitle';
import { useDialogContext, useDialogActions } from './dialogContext';
import { NsSelect } from './NsSelect';
import { TOLGEE_RESTRICT_ATTRIBUTE } from '../../constants';
import { Tags } from './Tags/Tags';
import { PluralFormCheckbox } from './PluralFormCheckbox';
import { ErrorAlert } from './ErrorAlert';
import { HttpError } from '../client/HttpError';
import { Tooltip } from '../common/Tooltip';
import { FilterTagMissingInfo } from './Tags/FilterTagMissingInfo';

const ScContainer = styled('div')`
  font-family: Rubik, Roboto, Arial;
  padding: 20px;
  box-sizing: border-box;
  max-width: 100%;
  width: 700px;
  display: flex;
  flex-direction: column;
`;

const ScHeading = styled('div')`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ScHeadingTitle = styled('div')`
  display: flex;
  margin: 0px;
  font-size: 19px;
`;

const ScHeadingRight = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

const ScKey = styled('p')`
  margin: 0px;
`;

const ScKeyHint = styled('span')`
  color: grey;
`;

const ScFieldsWrapper = styled('div')`
  margin-top: 10px;
`;

const ScTagsWrapper = styled('div')`
  margin-top: 5px;
`;

const ScGalleryWrapper = styled('div')`
  margin-top: 10px;
`;

const ScControls = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  min-height: 36px;
`;

const ScKeyTitle = styled(ScFieldTitle)`
  justify-content: start;
  gap: 4px;
  align-items: center;
`;

const ScLinkIcon = styled(Link)`
  display: grid;
  font-size: 16px;
  margin: 0px 0px;
`;

export const KeyForm = () => {
  const theme = useTheme();
  const { setUseBrowserWindow, onClose, onSave, setSelectedNs } =
    useDialogActions();

  const pluralsSupported = useDialogContext((c) => c.pluralsSupported);
  const linkToPlatform = useDialogContext((c) => c.linkToPlatform);
  const useBrowserWindow = useDialogContext((c) => c.useBrowserWindow);
  const input = useDialogContext((c) => c.input);
  const keyData = useDialogContext((c) => c.keyData);
  const formDisabled = useDialogContext((c) => c.formDisabled);
  const loading = useDialogContext((c) => c.loading);
  const error = useDialogContext((c) => c.error);
  const submitError = useDialogContext((c) => c.submitError);
  const saving = useDialogContext((c) => c.saving);
  const success = useDialogContext((c) => c.success);
  const keyExists = useDialogContext((c) => c.keyExists);
  const fallbackNamespaces = useDialogContext((c) => c.fallbackNamespaces);
  const selectedNs = useDialogContext((c) => c.selectedNs);
  const permissions = useDialogContext((c) => c.permissions);
  const filterTagMissing = useDialogContext((c) => c.filterTagMissing);

  const screenshotsView = permissions.canViewScreenshots;
  const viewPluralCheckbox = permissions.canEditPlural && pluralsSupported;
  const ready = !loading && !error;

  const generalError = error || submitError;

  return (
    <ScContainer {...{ [TOLGEE_RESTRICT_ATTRIBUTE]: 'true' }}>
      <ScHeading>
        <a
          href={linkToPlatform}
          target="_blank"
          rel="noreferrer noopener"
          id="_tolgee_platform_link"
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            opacity="0.99"
            fill={theme.palette.primary.main}
            style={{
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              strokeLinejoin: 'round',
              strokeMiterlimit: 2,
              height: 23,
            }}
          >
            <path d="M97.16,7.27a16.94,16.94,0,0,0-1.9,24.47,16.36,16.36,0,0,0,5,3.83,3.23,3.23,0,0,1-2.9,5.77,23.14,23.14,0,0,1-11.41-13C73.83,31.1,63.46,37.09,52.82,46.51c-27.44,24.3-34.35,61.74-16.38,85.26-4.57,5.79-8,12.22-8.9,18.69a20.88,20.88,0,0,0,5.62,18c9.18,9.61,21.42,7.13,31.26,5.14,6.58-1.34,12.8-2.6,16.5-.23,3.22,2.07,3.47,3.87,3.61,4.45,2.1,9.32-5.79,13.89-7.67,16.27a1.48,1.48,0,0,0,1.13,2.4c3.48,0,9-1.18,12.34-4.08s7.16-7.9,5.89-16.32c-.08-.5-.18-1-.32-1.58-.86-3.35-3.1-7.57-8.61-11.09-7.72-4.95-17-3.07-25.22-1.41-9.76,2-16,2.85-20.37-1.71a9.13,9.13,0,0,1-2.46-8.19c.54-3.77,2.65-7.89,5.62-11.86,21.71,16.89,56.87,13.47,82.67-9.39a75.34,75.34,0,0,0,20.81-28.09A23.14,23.14,0,0,1,134.8,89a3.23,3.23,0,0,1,6.08-2.19,16.37,16.37,0,0,0,3.2,5.39,16.85,16.85,0,1,0,11.48-28,3.23,3.23,0,0,1-.51-6.44,23.41,23.41,0,0,1,12.88,2.69c2.6-14.08,3.34-31.41-2.06-37.51-4.08-4.61-20.62-8-35.18-7.76A23.48,23.48,0,0,1,130.8,25a3.23,3.23,0,0,1-6.33-1.28A16.94,16.94,0,0,0,97.16,7.27Zm63.25,21a5.29,5.29,0,0,1-.57,6.19c-1.29,1.14-2.72-.51-4.1-2.06s-3.1-3.42-1.81-4.56A5.74,5.74,0,0,1,160.41,28.27Z"></path>
          </svg>
        </a>
        <ScHeadingTitle>Quick translation</ScHeadingTitle>

        {!useBrowserWindow && (
          <Tooltip title="Open in separate window">
            <IconButton
              onClick={() => setUseBrowserWindow(true)}
              color="inherit"
              size="small"
            >
              <OpenInNew fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <ScHeadingRight>{!loading && <LanguageSelect />}</ScHeadingRight>
      </ScHeading>
      <ScKeyTitle>
        Key
        {linkToPlatform && (
          <Tooltip title="Open key in Tolgee platform">
            <ScLinkIcon
              role="button"
              href={linkToPlatform}
              target="_blank"
              rel="noreferrer noopener"
              sx={{ color: 'inherit' }}
            >
              <OpenInNew />
            </ScLinkIcon>
          </Tooltip>
        )}
      </ScKeyTitle>
      <ScKey>
        {input}
        <ScKeyHint>
          {!keyExists && ready && " (key doesn't exist yet)"}
        </ScKeyHint>
      </ScKey>
      <NsSelect
        options={fallbackNamespaces}
        value={selectedNs}
        onChange={setSelectedNs}
      />
      {ready && (
        <ScTagsWrapper>
          <ScFieldTitle>Tags</ScFieldTitle>
          <Tags />
          {filterTagMissing && <FilterTagMissingInfo />}
        </ScTagsWrapper>
      )}
      {ready && viewPluralCheckbox && <PluralFormCheckbox />}
      {!error && (
        <ScFieldsWrapper>
          <TranslationFields />
        </ScFieldsWrapper>
      )}
      {screenshotsView && ready && (
        <ScGalleryWrapper>
          <ScreenshotGallery />
        </ScGalleryWrapper>
      )}
      {formDisabled && ready && (
        <ErrorAlert
          error={new HttpError('permissions_not_sufficient_to_edit')}
          severity="info"
        />
      )}
      {generalError && <ErrorAlert error={generalError} />}
      <ScControls>
        <Button onClick={onClose} color="secondary">
          {useBrowserWindow ? 'Close' : 'Cancel'}
        </Button>
        <LoadingButton
          loading={saving}
          disabled={saving || formDisabled || filterTagMissing}
          onClick={onSave}
          color="primary"
          variant="contained"
          style={{ marginLeft: '10px' }}
          data-cy="key-form-submit"
        >
          {success
            ? 'Saved! ✓'
            : keyData?.keyId === undefined
              ? 'Create'
              : 'Update'}
        </LoadingButton>
      </ScControls>
    </ScContainer>
  );
};
