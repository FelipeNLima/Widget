import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Options } from '../Options';
import { Success } from '../Success';
import { styles } from './styles';

export type FeedbackTypes = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null);
  const [feedbackSend, setFeedbackSent] = useState<boolean>(false)

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleCanceledFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleSentFeedback() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots 
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSend ? (
            <Success onSendAnotherFeedback={handleCanceledFeedback}/>
          ) : (
            <>
              {feedbackType ? (
                <Form 
                  feedbackType={feedbackType} 
                  onFeedbackCanceled={handleCanceledFeedback} 
                  onFeedbackSent={handleSentFeedback} 
                />
              ): (
                <Options onFeedbackTypeChanged={setFeedbackType} />
              )}
            </>
          )
        }
      </BottomSheet>
    </>
  );
}
export default gestureHandlerRootHOC(Widget);