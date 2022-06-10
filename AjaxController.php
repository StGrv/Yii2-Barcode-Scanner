 public function actionBarcodeScanner()
        {
            try {

                /* Receiving the barcode */
                $decodedText = intval( yii::$app->request->post( 'scanBarcode' ) );

                /* DB query */
                $prodResult = MyDB::find()
                    ->select( [ 'product_id', 'manufac_code' ] )
                    ->where( [ 'manufac_code' => $decodedText ] )
                    ->limit( 1 )
                    ->asArray()
                    ->one();

                if ( $prodResult ) {
                    /* Product URL */
                    $prodUrl = Yii::$app->MakeUrl->makeProductUrl( $prodResult['product_id'] );

                    return $this->redirect( $prodUrl );

                } else {

                    $result['notFoundMessage'] = 'Not found message';
                    return json_encode( $result );
                }

            } catch ( \Exception $e ) {

            }

            return FALSE;

        }