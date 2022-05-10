import * as FileSystem from 'expo-file-system';
import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { FeedbackTypes } from '../../components/Widget';
import api from '../../libs/api';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenShotButton } from '../ScreenShotButton';
import { styles } from './styles';

interface Props {
  feedbackType: FeedbackTypes;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [screenShot, setScreenShot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenShot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then((uri) => setScreenShot(uri))
      .catch((err) => console.error(err));
  }

  function handleRemoveScreenShot() {
    setScreenShot(null);
  }

  async function handleSendFeedback() {
    if (loading) return;

    setLoading(true);

    const screenShotBase64 = screenShot && await FileSystem.readAsStringAsync(screenShot, { encoding: 'base64' });

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenShotBase64}`,
        comment
      });

      onFeedbackSent();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />

          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenShotButton
          screenShot={screenShot}
          onTakeShot={handleScreenShot}
          onRemoveShot={handleRemoveScreenShot}
        />

        <Button onPress={handleSendFeedback} isLoading={loading} />
      </View>
    </View>
  );
}