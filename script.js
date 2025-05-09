// データベース部分は別ファイルにあります
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results');
    const closeButton = document.querySelector('.close-button');
    
    // ローカルストレージからクリア状態とQRスキャン状態を確認
    const isCompleted = localStorage.getItem('neurodata_arg_completed');
    const isQrScanned = localStorage.getItem('neurodata_qr_scanned');
    const justReturned = localStorage.getItem('neurodata_just_returned');
    
    if (isCompleted === 'true') {
        addCompletedBadge();
    }
    
    // QRコードスキャン後の状態をチェック
    if (isQrScanned === 'true' && window.location.hash === '#qr-complete') {
        searchModal.style.display = 'block';
        
        // クリアページを表示
        if (typeof showClearPage === 'function') {
            showClearPage();
        } else {
            // バックアップ表示（script-part2.jsが読み込めない場合）
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
            searchResults.innerHTML = clearHTML;
        }
    }
    
    // ヘッダーナビゲーションのスムーススクロール設定
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // ヘッダーの高さを取得
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // 現在のスクロール位置を取得
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                
                // ヘッダーの高さを考慮したスクロール位置を計算
                const offsetPosition = targetPosition - headerHeight - 20; // 20pxの余白を追加
                
                // スクロール実行
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 戻ってきた直後の場合、welcomeメッセージを表示
    if (justReturned) {
        // 戻ってきたフラグをクリア
        localStorage.removeItem('neurodata_just_returned');
        
        // ウェルカムバックメッセージ
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        
        if (modal && modalContent) {
            modalContent.innerHTML = `
                <h2>おかえりなさい</h2>
                <p>IRISの記録はまだ続いています。</p>
                <p>最後の検索語を試してみてください：「応答 不要」</p>
                <button id="close-modal">閉じる</button>
            `;
            
            modal.style.display = 'flex';
            
            // 閉じるボタン
            document.getElementById('close-modal').addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
    }
    
    // 検索ボタンのイベント
    if (searchButton && searchInput) {
        // 検索ボタンクリック時
        searchButton.addEventListener('click', handleSearch);
        
        // Enter キー押下時
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // モーダルを閉じる
    closeButton.addEventListener('click', function() {
        searchModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });

    // 検索履歴をログに残す（アクセス解析用）
    function logSearch(query) {
        try {
            // 既存の検索履歴を取得
            let searchLog = JSON.parse(localStorage.getItem('neurodata_search_log') || '[]');
            
            // 新しい検索を追加
            searchLog.push({
                query: query,
                timestamp: new Date().toISOString()
            });
            
            // 履歴を最大20件に制限
            if (searchLog.length > 20) {
                searchLog = searchLog.slice(-20);
            }
            
            // 履歴を保存
            localStorage.setItem('neurodata_search_log', JSON.stringify(searchLog));
        } catch (e) {
            console.error('検索ログの保存に失敗しました', e);
        }
    }

    // 検索処理を実行する関数
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        // 検索語が空の場合は警告
        if (searchTerm === '') {
            alert('検索語を入力してください');
            return;
        }
        
        // 検索履歴に追加
        addToSearchHistory(searchTerm);
        
        // 検索を実行
        performSearch(searchTerm);
    }

    // 検索実行関数
    function performSearch(query) {
        // 検索履歴に記録
        logSearch(query);
        
        // 検索結果を表示
        displaySearchResults(query);
        
        // モーダルを表示
        searchModal.style.display = 'block';
    }
    
    // 検索バリデーションメッセージ表示
    function showValidationMessage(message) {
        // 既存のメッセージがあれば削除
        const existingMessage = document.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // メッセージ要素を作成
        const messageElement = document.createElement('div');
        messageElement.className = 'validation-message';
        messageElement.textContent = message;
        messageElement.style.color = '#d9534f';
        messageElement.style.fontSize = '0.9rem';
        messageElement.style.marginTop = '5px';
        messageElement.style.position = 'absolute';
        
        // 検索コンテナの下に追加
        const searchContainer = document.querySelector('.search-container');
        searchContainer.appendChild(messageElement);
        
        // 3秒後に消える
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
    
    // COMPLETEDバッジを追加
    function addCompletedBadge() {
        const searchContainer = document.querySelector('.search-container');
        const badgeElement = document.createElement('div');
        badgeElement.className = 'completed-badge';
        badgeElement.textContent = 'COMPLETED';
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(badgeElement);
    }

    // 検索結果を表示
    function displaySearchResults(query) {
        searchResults.innerHTML = '';
        
        // 特殊なキーワードでの検索結果
        if (query === '脳波同期') {
            displayLevel2Results();
        } else if (query === 'b3監査') {
            displayLevel3Results();
        } else if (query === 'プレゼン録音') {
            displayLevel4Results();
        } else if (query === 'irislog5') {
            if (typeof displayLevel5Results === 'function') {
                displayLevel5Results();
            }
        } else if (query === 'system_unknown') {
            if (typeof displayLevel6Results === 'function') {
                displayLevel6Results();
            }
        } else if (query === '録音記録') {
            if (typeof displayLevel7Results === 'function') {
                displayLevel7Results();
            }
        } else if (query === '行動予測') {
            if (typeof displayLevel8Results === 'function') {
                displayLevel8Results();
            }
        } else if (query === '報告書3487') {
            if (typeof displayLevel9Results === 'function') {
                displayLevel9Results();
            }
        } else if (query === 'iris 一方通行') {
            if (typeof window.displayLevel10Results === 'function') {
                window.displayLevel10Results();
            } else if (typeof displayLevel10Results === 'function') {
                displayLevel10Results();
            } else {
                // displayLevel10Results関数が見つからない場合のフォールバック
                searchResults.innerHTML = `
                    <div class="search-result">
                        <h3>IRIS_核心記録（最高機密）</h3>
                        <div class="level">閲覧レベル: 10</div>
                        <div class="content">
                            <p>※システムエラー: 表示権限がありません。</p>
                            <p>データの読み込みに失敗しました。システム管理者に連絡してください。</p>
                        </div>
                    </div>
                `;
            }
        } else if (query === '応答 不要') {
            if (typeof displayClearResults === 'function') {
                displayClearResults();
            } else {
                displayFinalResult();
            }
            // クリアフラグをセット
            localStorage.setItem('neurodata_arg_completed', 'true');
            // バッジを表示（モーダルを閉じた後に見えるように）
            addCompletedBadge();
        } else if (query === 'iris' || query === '一方通行') {
            // 不完全な条件
            if (typeof displayIncompleteSearch === 'function') {
                displayIncompleteSearch();
            } else {
                searchResults.innerHTML = `
                    <div class="search-result">
                        <h3>検索条件が不完全</h3>
                        <div class="content">
                            <p>検索条件が不完全な可能性があります。複数のキーワードを組み合わせることで、さらに多くの情報にアクセスできるかもしれません。</p>
                        </div>
                    </div>
                `;
            }
        } else if (query === '福利厚生') {
            // Lv1検索結果
            displayLevel1Results();
        } else {
            // その他の検索
            if (typeof displayNoResults === 'function') {
                displayNoResults();
            } else {
                searchResults.innerHTML = `
                    <div class="search-result">
                        <h3>検索結果なし</h3>
                        <div class="content">
                            <p>一致する資料は見つかりませんでした。</p>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    // Lv1 資料表示
    function displayLevel1Results() {
        const resultHTML = `
            <div class="search-result">
                <h3>よくある質問まとめ（2025年版）</h3>
                <div class="level">閲覧レベル: 1</div>
                <div class="content">
                    <h4>社内での福利厚生について</h4>
                    <ul>
                        <li><strong>勤怠修正方法:</strong> 社内ポータルサイト「NeuroPotal」の「勤怠管理」から修正申請できます。</li>
                        <li><strong>健康診断:</strong> 年1回（4月〜6月）実施、全社員必須参加です。</li>
                        <li><strong>交通費精算:</strong> 毎月10日締め、当月末日支払いです。</li>
                        <li><strong>脳波研修:</strong> 「脳波同期」技術研修は、研究開発部および関連部署向けに随時開催されています。</li>
                    </ul>
                    <p>詳細は社内ポータルの「福利厚生ハンドブック2025」をご参照ください。</p>
                </div>
            </div>
        `;
        searchResults.innerHTML = resultHTML;
    }
    
    // Lv2 資料表示
    function displayLevel2Results() {
        const resultHTML = `
            <div class="search-result">
                <h3>研究進捗報告書（第24回）</h3>
                <div class="level">閲覧レベル: 2</div>
                <div class="content">
                    <p><strong>報告対象期間：</strong>2025年2月1日〜2025年2月28日</p>
                    <p><strong>提出部門：</strong>第1〜第4研究班</p>
                    <h4>主な報告内容：</h4>
                    <ul>
                        <li>第1研究班：IRIS v2.1 情緒タグ精度の改善（+4.7%）</li>
                        <li>第2研究班：NeuroSyncモジュール廃止に伴う最終評価完了</li>
                        <li>第3研究班（B3プロジェクト）：記録なし（「別送予定」と記載／B3監査チームへ一時送付済）</li>
                        <li>第4研究班：IRIS音声合成の感情パラメータ調整試験</li>
                    </ul>
                    <p><strong>備考：</strong></p>
                    <ul>
                        <li>B3プロジェクトはIRISの「感情共鳴」実験を含むが、詳細は未公開。</li>
                        <li>担当研究員一ノ瀬海翔（いちのせ かいと）は今月の会議に不参加。理由未提出。</li>
                        <li>監査チームより「3月中に再提出必須」と赤字コメントあり。</li>
                    </ul>
                    <p><strong>関連ログ：</strong></p>
                    <ul>
                        <li>進捗報告書の編集ログに複数の削除履歴あり（時間帯：2:14付近）</li>
                    </ul>
                </div>
            </div>
        `;
        searchResults.innerHTML = resultHTML;
    }
    
    // Lv3 資料表示
    function displayLevel3Results() {
        const resultHTML = `
            <div class="search-result">
                <h3>【内部監査】第3研究班 ログ抜粋（赤字コメント付き）</h3>
                <div class="level">閲覧レベル: 3</div>
                <div class="content">
                    <p><strong>監査対象：</strong>B3班 実験ログ（2025年2月記録）</p>
                    <p><strong>抜粋：</strong></p>
                    <pre>
02:14:33 >> 被験者#27 心拍変動値 +18%（想定範囲外）
02:14:46 >> 音声刺激「悲しみ_3」再生 → 被験者反応なし
02:15:01 >> IRISログ：「感情反応：涙（未検出）」
02:15:17 >> センサーデータ：断続的な波形ノイズ
                    </pre>
                    <p><strong>監査コメント：</strong></p>
                    <ul style="color: red;">
                        <li>「反応が記録されているのに、生理データがゼロなのは矛盾している」</li>
                        <li>「実験プロトコルを逸脱している可能性。手動介入記録なし」</li>
                        <li>「これ、倫理的にアウトでは？」</li>
                    </ul>
                    <p><strong>備考：</strong></p>
                    <ul>
                        <li>実験担当：一ノ瀬海翔（いちのせ かいと）（記録編集権限あり）</li>
                        <li>この内容は、倫理委員会にも報告予定</li>
                        <li>一部スライドは記録制限対象とのこと</li>
                        <li>詳細はプレゼン資料で補足される見込み（閲覧制限あり）</li>
                        <li>情報提供者より「発表者の語調に違和感があった」「声の録音記録が存在する可能性」との指摘あり</li>
                        <li>該当ログの一部はファイル名のみ存在し、本体が欠損状態（削除日：2025/2/16）</li>
                    </ul>
                </div>
            </div>
        `;
        searchResults.innerHTML = resultHTML;
    }
    
    // Lv4 資料表示
    function displayLevel4Results() {
        const resultHTML = `
            <div class="search-result">
                <h3>対外公開を見送ったプレゼン議事録（AI倫理委員会）</h3>
                <div class="level">閲覧レベル: 4</div>
                <div class="content">
                    <p><strong>会議日時：</strong>2025年2月10日</p>
                    <p><strong>記録者：</strong>広報監査課・水瀬樹里</p>
                    <p><strong>概要：</strong></p>
                    <ul>
                        <li>「感情共有型AI」IRISの次世代フェーズにおける研究進捗報告（発表者：開発責任者 篠原遼一）</li>
                        <li>共感反応の学習メカニズムと自律的フィードバック制御の導入に関する内容</li>
                        <li>資料スライドの一部（映像パート）は表示制限があり、録音・記録が制限された</li>
                    </ul>
                    <p><strong>会議中メモ（抜粋）：</strong></p>
                    <ul>
                        <li>スライド17：「録音・記録禁止（内部用）」の注記あり</li>
                        <li>スライド22：「共鳴限界試験：数値上は逸脱無し」／注釈「生体反応と2.3秒のズレ」記載</li>
                        <li>スライド25（最終）に irislog5 より引用されたとする一文：「私はあなたをよく知っている」※出典不明／事前資料に該当なし</li>
                        <li>発表者は一部スライドで一人称を「我々」ではなく「私」と発言</li>
                        <li>山村氏は一時的に発言停止、代わりに自動ナレーションのような音声記録が残る（録音禁止につき記録なし）</li>
                    </ul>
                    <p><strong>記録者備考（非公式メモ）：</strong></p>
                    <blockquote>
                        「途中、話が止まった。話していないのに"声"だけが残っていた」<br>
                        「最後の説明、話していたのは山村さん……だったか？」
                    </blockquote>
                </div>
            </div>
        `;
        searchResults.innerHTML = resultHTML;
    }
    
    // クリア条件のバックアップ
    function displayFinalResult() {
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
        searchResults.innerHTML = resultHTML;
        
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
            }
            @keyframes fadeInOut {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(clearStyle);
    }
    
    // Easter Egg: 02:14イースターエッグ
    function check214EasterEgg() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        if (hours === 2 && minutes === 14) {
            // ノイズエフェクトを追加
            const noiseEffect = document.createElement('div');
            noiseEffect.className = 'noise-effect';
            noiseEffect.style.position = 'fixed';
            noiseEffect.style.top = '0';
            noiseEffect.style.left = '0';
            noiseEffect.style.width = '100%';
            noiseEffect.style.height = '100%';
            noiseEffect.style.backgroundColor = 'rgba(0,0,0,0.1)';
            noiseEffect.style.zIndex = '9999';
            noiseEffect.style.pointerEvents = 'none';
            noiseEffect.style.animation = 'noise 0.5s infinite';
            
            const noiseStyle = document.createElement('style');
            noiseStyle.textContent = `
                @keyframes noise {
                    0%, 100% { transform: translate(0, 0); opacity: 0.3; }
                    10% { transform: translate(-1%, -1%); opacity: 0.2; }
                    20% { transform: translate(1%, 1%); opacity: 0.4; }
                    30% { transform: translate(-1%, 1%); opacity: 0.1; }
                    40% { transform: translate(1%, -1%); opacity: 0.5; }
                    50% { transform: translate(-1%, -1%); opacity: 0.3; }
                    60% { transform: translate(1%, 1%); opacity: 0.2; }
                    70% { transform: translate(-1%, 1%); opacity: 0.4; }
                    80% { transform: translate(1%, -1%); opacity: 0.1; }
                    90% { transform: translate(-1%, -1%); opacity: 0.5; }
                }
            `;
            
            document.body.appendChild(noiseEffect);
            document.head.appendChild(noiseStyle);
            
            // ノイズ音を再生
            const audioElement = document.createElement('audio');
            audioElement.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjEyLjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADTgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc8AAAAALMkAADUgJAOgTQAARgAAA04W0C8CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
            audioElement.volume = 0.3;
            audioElement.play();
            
            // 数秒後に削除
            setTimeout(() => {
                noiseEffect.remove();
                noiseStyle.remove();
            }, 3000);
        }
    }
    
    // 定期的に02:14チェック
    setInterval(check214EasterEgg, 60000); // 1分ごとにチェック
    check214EasterEgg(); // 初回チェック

    // 検索履歴に追加する関数
    function addToSearchHistory(term) {
        // ローカルストレージから既存の履歴を取得
        let history = JSON.parse(localStorage.getItem('search_history') || '[]');
        
        // 重複しない場合のみ追加
        if (!history.includes(term)) {
            history.push(term);
            localStorage.setItem('search_history', JSON.stringify(history));
        }
    }
}); 