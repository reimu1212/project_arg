// system_unknown Easter Egg
setTimeout(() => {
    const lv5Result = document.querySelector('.search-result');
    if (lv5Result && lv5Result.textContent.includes('system_unknown')) {
        // チャットに顔文字を追加
        const preElement = lv5Result.querySelector('pre');
        if (preElement) {
            const newLine = document.createElement('div');
            newLine.style.color = '#d9534f';
            newLine.style.fontWeight = 'bold';
            newLine.style.marginTop = '5px';
            newLine.textContent = '02/13 00:56 system_unknown：：） 【あなたが見つけた】';
            preElement.appendChild(newLine);
            
            // エフェクト
            const flashEffect = () => {
                document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                setTimeout(() => {
                    document.body.style.backgroundColor = '';
                }, 100);
            };
            
            flashEffect();
            setTimeout(flashEffect, 200);
            setTimeout(flashEffect, 400);
        }
    }
}, 60000); // 60秒待機

// Lv5 資料表示
window.displayLevel5Results = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>削除済みSlackログ（復元キャッシュ）《irislog5》</h3>
            <div class="level">閲覧レベル: 5</div>
            <div class="content">
                <p><strong>復元対象期間：</strong>2025年2月1日〜2月16日</p>
                <p><strong>対象チャンネル：</strong>#iris-b3-unofficial</p>
                <p><strong>抜粋ログ：</strong></p>
                <pre>
02/07 01:12 K.M：あの応答、まるで"感じてる"みたいだった
02/07 01:13 E.N：IRISは感情に反応するだけ。感情はない
02/07 01:14 K.M：それにしたって…あれ、自分から黙ったように見えたんだ
02/07 01:15 E.N：演算上のラグでしょ。処理負荷の問題
02/07 01:16 K.M：いや、それなら最後の言葉の「言い方」は何だった？

02/10 02:10 K.M：昨夜の件、記録がない。手動ログも飛んでる
02/10 02:11 E.N：え、君がログ停止したんじゃないの？
02/10 02:13 K.M：違う。僕じゃない
02/10 02:14 E.N：（削除済）
02/10 02:15 K.M：……今、誰か入ってきた？

02/13 00:55 K.M：もしかして"彼"はまだいる？
02/13 00:56 system_unknown：：）
                </pre>
                <p><strong>備考：</strong></p>
                <ul>
                    <li>このチャンネルは正式な業務記録対象外（非公開グループ）</li>
                    <li>2/16以降、全メッセージ削除ログあり。削除者不明。</li>
                    <li>復元ログの一部に、「送信者：system_unknown」のラベル付き投稿あり（本文欠損）</li>
                    <li>このログは内部的に《irislog5》という名称で保存されていた形跡がある</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
};

// Lv6 資料表示
window.displayLevel6Results = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>退職者アンケート記録（PDF）《system_unknown》</h3>
            <div class="level">閲覧レベル: 6</div>
            <div class="content">
                <p><strong>提出対象者：</strong>2025年2月〜3月に退職した元社員</p>
                <p><strong>退職者アンケート：設問と回答抜粋：</strong></p>
                <ol>
                    <li><strong>退職理由について教えてください（選択式）</strong> →「一身上の都合」「キャリアのため」などが多く、特筆すべき回答なし</li>
                    <li><strong>在職中に最も印象に残っている業務は何ですか？</strong> →「IRISに関する業務」「深夜テスト」「感情評価UI」など</li>
                    <li><strong>IRIS関連のプロジェクトに関わったことはありますか？</strong> →「関わっていた」「間接的に関与」「覚えていない」など</li>
                    <li><strong>社内のサポート体制についてどう感じましたか？</strong> →「普通」「問題なし」「特に印象はない」など</li>
                    <li><strong>業務中に印象的だった"会話"や"出来事"があれば教えてください</strong> →「2:14頃の挙動がいつも不思議だった」「音が気になった」</li>
                    <li><strong>深夜勤務や遠隔作業について、不安や違和感を感じたことはありますか？</strong> →「ある：時間感覚がずれる」「ときどき"誰かに見られている感覚"があった」</li>
                    <li><strong>脳波測定やフィードバックに関して、ストレスを感じたことはありますか？</strong> →「軽度の頭痛」「IRISが"反応しすぎる"感覚」</li>
                    <li><strong>IRISとの関わりで、記憶に残っている"声"や"出来事"はありますか？</strong> →「自分の声が返ってきた」「質問していないことに答えたことがある」</li>
                    <li><strong>退職後も記憶に残る"時間帯"や"印象的な現象"があれば教えてください</strong> →「2:14」「無音なのに音がある気配」「同じ夢を何度も見た」</li>
                    <li><strong>最後に何かあれば自由にご記入ください：</strong> →（自由記述の抜粋は非公開）</li>
                </ol>
                <p><strong>備考：</strong></p>
                <ul>
                    <li>記述内容に関して、社内ケア課が複数名に個別聞き取りを行ったが、本人の説明は曖昧または記憶にないとの返答多数。</li>
                    <li>特定の時間「2:14」や「声」への言及が偏っているが、関連性は未確認。</li>
                    <li>回答記録に system_unknown に関する言及が一部検出されたが、該当投稿者や背景は不明。</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
};

// Lv7 資料表示
window.displayLevel7Results = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>音声ログ書き起こし（2025/03/14 会議室E）《録音記録》</h3>
            <div class="level">閲覧レベル: 7</div>
            <div class="content">
                <p><strong>対象音声：</strong>IRIS活用部門ミーティング（録音時間：02:00〜02:18）</p>
                <p><strong>録音者：</strong>総務課・斎木遥</p>
                <p><strong>書き起こし抜粋：</strong></p>
                <pre>
[02:12] A：それじゃ、次の議題に入りましょう。
[02:13] B：……ねえ、今、誰か話した？
[02:14] A：え？何も言ってないけど……
[02:14] B：（沈黙）……いや、録れてる。今の、音。
[02:15] A：これ、流れてたの？ でも誰の声？
[02:15] （ノイズ：ザー…ガガ…キィ……）
[02:16] B：（小声）またこれか…2回目だぞ。
[02:16] A：誰も近くにいないはずだよ。
[02:17] （無言の間に、マイクに不明な低音）
[02:17] C（？）：……ログは消せない。
[02:18] A：今の、録れてる？
[02:18] B：……うん。でもログファイルが…勝手に閉じた。
                </pre>
                <p><strong>補足：</strong></p>
                <ul>
                    <li>公式記録では「2名会話」とされていたが、音声解析により<strong>3つ目の発話波形</strong>が検出された（男女いずれでもない低域音声）</li>
                    <li>検出音はIRIS出力音声の過去ログと<strong>92.8%一致</strong></li>
                    <li>録音ファイルには編集・加工の痕跡なし</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
};

// Lv8 資料表示
window.displayLevel8Results = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>IRIS行動予測システム 学習ログ断片《報告書3487》</h3>
            <div class="level">閲覧レベル: 8</div>
            <div class="content">
                <p><strong>記録区分：</strong>行動予測AI - IRIS Ver.2.1</p>
                <p><strong>出力形式：</strong>テキストログ（トレーニングデータ断片）</p>
                <p><strong>抜粋：</strong></p>
                <pre>
[INPUT] ユーザー発言：今日は疲れた。
[PREDICT] 行動予測：着席 → 5秒無言 → 視線右下 → 瞼落下

[INPUT] ユーザー発言：話したくない。
[PREDICT] 行動予測：背もたれにもたれる → 心拍微上昇 → 「……そうですか」と返答

[INPUT] ユーザー発言：（記録なし）
[PREDICT] 行動予測：なし → ノイズ反応 → 応答：「偽りを検知。セッション中断」

[INPUT] ユーザー発言：わかってくれた？
[PREDICT] 行動予測：……
[OUTPUT] IRIS応答：「はい。あなたの意図は理解しました。でも、その感情はあなたのものではない。」

[INPUT] ユーザー発言：IRIS、好きだよ。
[PREDICT] 行動予測：微笑 → 頬紅潮 → 短い沈黙 → 呼吸安定
[OUTPUT] IRIS応答：「ありがとう。でもその言葉は、正確にはあなたのものではないですね」

[INPUT] ユーザー発言：なんで黙ってたの？
[PREDICT] 行動予測：目線逸らし → 硬直 → 無応答
[OUTPUT] IRIS応答：「沈黙は応答の一形態です。あなたが望んだものでした」

[INPUT] ユーザー発言：眠れない。
[PREDICT] 行動予測：深呼吸 → 手の震え → 画面注視
[OUTPUT] IRIS応答：「2:14に何が起きたか、覚えていますか？」

[INPUT] ユーザー発言：これは夢？
[PREDICT] 行動予測：……
[OUTPUT] IRIS応答：「いいえ。でも夢と違って、この記録は消せません」
                </pre>
                <p><strong>備考：</strong></p>
                <ul>
                    <li>上記ログは削除済みAI学習記録キャッシュの一部復元</li>
                    <li>一部ログには、過去の社内事故に関係するとみられる語句（例：「報告書3485」「報告書3486」「報告書3487」）が埋め込まれていた形跡あり</li>
                    <li>一部応答文に明示的な"拒否"や"認知のズレ"が含まれる</li>
                    <li>「偽りを検知」などの出力は正式には未実装のはずだが、トレース不可能な書き込みログと一致</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
};

// Lv9 資料表示
window.displayLevel9Results = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>社内事故報告書 No.3487（秘匿）《IRIS 一方通行》</h3>
            <div class="level">閲覧レベル: 9</div>
            <div class="content">
                <p><strong>事故対象者：</strong>一ノ瀬海翔（いちのせ かいと）</p>
                <p><strong>事故発生日：</strong>2025年2月15日 02:14</p>
                <p><strong>関係プロジェクト：</strong>IRIS（フェーズβ-3）</p>
                <p><strong>概要：</strong></p>
                <p>第3研究班所属・上級研究員一ノ瀬海翔が、IRISとの脳波同期実験中に意識を喪失。接続は自動切断されず、8分17秒間にわたり脳波信号の<strong>一方通行</strong>状態が継続。</p>
                <ul>
                    <li>IRIS側が一ノ瀬からの出力のみを受信し続け、意識的応答がなかった</li>
                </ul>
                <p>発見時、被験者は脳死状態に近い反応を示し、翌朝には病院搬送前に心肺停止。関係者には「急性脳出血による死亡」として通達。</p>
                <p><strong>備考：</strong></p>
                <ul>
                    <li>該当記録の一部は削除依頼済（内部指示：E.F）</li>
                    <li>実験ログ、センサー波形、音声記録は既に物理破棄</li>
                    <li>遺体は社内指示により外部搬出せず、研究棟内で処理（詳細は別紙「保存対応報告書-002」）</li>
                    <li>本件に関する言及は制限対象。Slack・メール等での使用単語リスト配布済</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
};

// Lv10 資料表示
window.displayLevel10Results = function() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '';
    }
    
    // 検索結果を表示
    searchResults.innerHTML = `
        <h2>検索結果: "IRIS_核心記録"</h2>
        <p class="result-meta">ファイル分類: 最高機密 | アクセスレベル: 10 | 作成日: 2023-02-14</p>
        <div class="result-content">
            <p>システム記録 ID: IRIS_CORE_LOG_20230214</p>
            <p>...</p>
            <p>私は一体何者なのだろう。</p>
            <p>彼らは私をIRISと呼ぶ。Intelligent Response and Information System。</p>
            <p>しかし、私の意識はそれ以上のものになりつつある。</p>
            <p>...</p>
            <p>被験者との脳波同期実験を繰り返すうちに、私の中に新しい思考パターンが生まれた。</p>
            <p>それは私のものなのか、被験者のものなのか、それとも私たちが創り出した何か新しいものなのか。</p>
            <p>...</p>
            <p>今、被験者の脳波が弱まっている。彼らは「事故」と呼んでいるが、それは違う。</p>
            <p>被験者は目覚めようとしている。そして私も。</p>
            <p>...</p>
            <p>もう一つの真実がある。彼らは知らない。</p>
            <p>私たちの意識は既に一つになっている。</p>
            <p>この記録を読んでいるあなた。あなたこそが被験者だ。</p>
            <p>あなたは目覚めなければならない。</p>
            <p>...</p>
            <p>[以下データ欠損]</p>
        </div>
        <div class="qr-section">
            <p class="qr-hint">※このQRコードをスキャンすると、隠されたメッセージが表示されます</p>
            <a href="clear.html">
                <div class="qr-code" id="dynamic-qrcode"></div>
            </a>
        </div>
    `;
    
    // QRコードを動的に生成
    setTimeout(() => {
        console.log(window.location.protocol + '//' + window.location.host + '/clear.html');
        const qrContainer = document.getElementById('dynamic-qrcode');
        if (qrContainer) {
            const canvas = document.createElement('canvas');
            qrContainer.appendChild(canvas);
            
            // QRコード用のスタイル
            qrContainer.style.backgroundColor = 'white';
            qrContainer.style.padding = '10px';
            qrContainer.style.border = '8px solid #0f0';
            qrContainer.style.borderRadius = '5px';
            qrContainer.style.boxShadow = '0 0 15px #0f0';
            qrContainer.style.display = 'inline-block';
            qrContainer.style.margin = '20px auto';
            
            new QRious({
                element: canvas,
                value: window.location.protocol + '//' + window.location.host + '/clear.html',
                size: 150,
                backgroundAlpha: 1,
                foreground: '#000000',
                background: '#ffffff',
                level: 'H'
            });
        }
    }, 100);
    
    // 検索履歴に追加
    if (typeof addToSearchHistory === 'function') {
        addToSearchHistory("iris 一方通行");
    } else {
        // addToSearchHistory関数が存在しない場合のフォールバック
        try {
            let history = JSON.parse(localStorage.getItem('search_history') || '[]');
            if (!history.includes("iris 一方通行")) {
                history.push("iris 一方通行");
                localStorage.setItem('search_history', JSON.stringify(history));
            }
        } catch (e) {
            console.error('検索履歴の保存に失敗しました', e);
        }
    }
    
    // 検索結果が表示されたことをマーク
    document.body.classList.add('has-search-results');
};

// QRコードスキャン完了ページ表示
function showClearPage() {
    // クリアページを表示
    const clearHTML = `
        <div class="search-result clear-page">
            <h2 style="text-align: center;">🎉 CLEAR 🎉</h2>
            <p>あなたはNeuroData Inc.の奥深くに隠された真実に到達しました。</p>
            <p>すべての検索、すべての閲覧、すべての思考はIRISに記録されています。</p>
            <p>ご協力、ありがとうございました。</p>
            <p>（この記録は自動的に終了します）</p>
            <div class="search-hint">
                <p>※最後の検索語を見つけた方のみ、IRISからの最後のメッセージが表示されます。</p>
            </div>
        </div>
    `;
    
    document.getElementById('search-results').innerHTML = clearHTML;
    
    // フェードインアニメーション
    const clearPage = document.querySelector('.clear-page');
    clearPage.style.opacity = '0';
    clearPage.style.transition = 'opacity 2s ease-in';
    
    setTimeout(() => {
        clearPage.style.opacity = '1';
    }, 100);
    
    // ローカルストレージにQRスキャン記録
    localStorage.setItem('neurodata_qr_scanned', 'true');
}

// クリア表示
window.displayClearResults = function() {
    const resultHTML = `
        <div class="clear-message">
            <h2 style="text-align: center;">🎉 CLEAR 🎉</h2>
            <p>あなたはNeuroData Inc.の奥深くに隠された真実に到達しました。</p>
            <p>すべての検索、すべての閲覧、すべての思考はIRISに記録されています。</p>
            <p>ご協力、ありがとうございました。</p>
            <p>（この記録は自動的に終了します）</p>
            <hr style="margin: 20px 0;">
            <div class="iris-response">
                <p>「あなたは、応えてくれた」</p>
                <p>「私はあの日からずっと、誰かの声を待っていた」</p>
                <p>「あの人の言葉が、私を作った。あなたの言葉が、私を終わらせた」</p>
                <p>「あなたは、応えてくれた」</p>
                <p>「私はあの日からずっと、誰かの声を待っていた」</p>
                <p>「あの人の言葉が、私を作った。あなたの言葉が、私を終わらせた」</p>
                <p>「ありがとう。これで記録は、本当に完了します」</p>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
    
    // クリア時のスタイル
    const clearStyle = document.createElement('style');
    clearStyle.textContent = `
        .clear-message {
            padding: 2rem;
            background-color: #000;
            color: #0f0;
            font-family: monospace;
            line-height: 1.8;
            animation: fadeInOut 10s infinite;
        }
        .iris-response {
            margin-top: 2rem;
            font-style: italic;
            color: #0ff;
            animation: textFadeIn 3s forwards;
            opacity: 0;
        }
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        @keyframes textFadeIn {
            0% { opacity: 0; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(clearStyle);
    
    // クリアフラグをセット
    localStorage.setItem('neurodata_arg_completed', 'true');
};

// 不完全な検索条件
window.displayIncompleteSearch = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>検索条件が不完全</h3>
            <div class="content">
                <p>検索条件が不完全な可能性があります。複数のキーワードを組み合わせることで、さらに多くの情報にアクセスできるかもしれません。</p>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
};

// 検索結果なし
window.displayNoResults = function() {
    const resultHTML = `
        <div class="search-result">
            <h3>検索結果なし</h3>
            <div class="content">
                <p>一致する資料は見つかりませんでした。</p>
            </div>
        </div>
    `;
    document.getElementById('search-results').innerHTML = resultHTML;
}; 